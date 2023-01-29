# Layer 설치

`
mkdir nodejs

cd nodejs

touch package.json

npm i axios 

rm package-lock.json

cd ..

zip -r axios.zip nodejs

`

## Lambda 콘솔 편집

- Lambda > Layer(계층) > Layer 추가
- zip 파일 업로드
- Lambda > Layer 추가할 함수 선택 > Layer 클릭 후 업로드한 Layer 선택
