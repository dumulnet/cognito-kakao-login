# cognito-kakao-login

## 기본 설정 상태

- Amplify 기본 설정 완료
- 카카오 개발자포털 가입 완료

## 카카오 로그인 서비스 설정

<img width="1170" alt="app_email" src="https://user-images.githubusercontent.com/112446703/215300217-bc48d8f2-3e01-4d91-ba74-03e7a987a66a.png">

![kakao1](https://user-images.githubusercontent.com/112446703/215300212-b697c980-7d15-4382-bcb8-e1631b12451b.png)

![kakao2](https://user-images.githubusercontent.com/112446703/215300204-f60fb9db-315b-4860-b3c0-ff22d3ef280e.png)

## Amplify add api

<img width="1160" alt="스크린샷 2023-01-29 오전 11 03 05" src="https://user-images.githubusercontent.com/112446703/215300340-bb93d3cf-0c4a-4c43-8bf2-9f2a06e98f81.png">

- Lambda 이어서 바로 생성하기
<img width="1175" alt="스크린샷 2023-01-29 오전 11 03 40" src="https://user-images.githubusercontent.com/112446703/215300335-efae5c8c-f807-45d0-91ac-a87d798e8efb.png">

- [Lambda 역할 추가](/lambda/kakaologin-cloudformation-template.json)
`
...
 "Resource": {
                "Fn::Sub": [
                  "arn:aws:cognito-idp:${region}:${account}:userpool/${userpoolId}",
                  {
                    "region": {
                      "Ref": "AWS::Region"
                    },
                    "account": {
                      "Ref": "AWS::AccountId"
                    },
                    "userpoolId": "ap-northeast-2_pL7ji6Sn4"
                  }
                ]
              }
            }

`
