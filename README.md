## Dialogflow Slot filling 무한 루프 이슈  

챗봇 구현 시 어떤 인텐트에서 비즈니스 로직을 처리하기 위해, 
특정 파라미터가 반드시 필요한 경우가 있다.  

인텐트에 파라미터를 세팅하고 REQUIRED를 체크하면 되는데 
사용자가 의도를 이해하지 못하고 적절한 답변을 하지 않으면 
무한 루프에 빠져 계속해서 파라미터 입력을 요구 받는다.  

이를 Webhook을 사용하여 처리할 수 있다. 
인텐트에 slot filling을 핸들링하기 위한 파라미터를 정의하고, 
웹훅 로직에서 지정한 수를 넘어서면 아래 중 하나의 방법으로 무한루프를 회피할 수 있다.

- context 삭제
- 다른 인텐트로 점프

-----------------------------  

> Slot filling 기능을 사용하지 않고 input context를 사용해서 변수를 채울 수도 있다.
> 하지만 구현해본 결과 최대한 이런 형태의 인텐트 생성을 피하는게 좋을 것 같고 
> 불가피하다면 follow-up intent를 직접 설정하는 것이 인텐트 파악에 있어 그 가시성이 좋을 것 같다.