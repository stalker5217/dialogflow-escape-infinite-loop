import * as functions from 'firebase-functions';

const {WebhookClient} = require('dialogflow-fulfillment');

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function deliveryRequest(agent: any){
	// Entity로 정의된 Required Prameter
	const food: string = agent.parameters.food;

	// Slot Filling 시도 횟수
	const tryCnt: number = (agent.parameters.remainCnt === undefined || agent.parameters.remainCnt === '') ? 0 : agent.parameters.remainCnt;
	const MAX_TRY_CNT = 3;

	// 파라미터가 채워지지 않았을 경우
	if(food === undefined || food === ''){
		// 허용된 숫자
		if(tryCnt > MAX_TRY_CNT){
			// Solution 1. 모든 Context 날리기
			for (const ctx of agent.context) agent.context.delete(ctx.name);
			
			// Solution 2. 다른 인텐트로 점프!
			agent.add('-'); // dummy data
			agent.setFollowupEvent('SLOT_FAIL');
		}
		
		// 입력 재시도
		else{
			agent.context.set({name: 'FillFoodParam', lifespan: 1, parameters: { tryCnt: tryCnt + 1 }});
			agent.add('What food do you want?');
		}
	}
	else agent.add('OK! I\'ll deliver it ASAP.');
  }
  
  const intentMap = new Map();
  intentMap.set('delivery-request', deliveryRequest);

  agent.handleRequest(intentMap);
});
