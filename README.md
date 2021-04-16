## 1. 프로젝트 소개
1) 활용한 데이터 세트
- 해리 포터 전 시리즈 영화 대본 데이터 세트 <br />
: 해리 포터 영화 1~7편 까지 총 8개의 영화 대본 데이터 세트를 활용하였습니다. <br />
https://www.kaggle.com/kornflex/harry-potter-movies-dataset?select=datasets  <br />
- 해리 포터와 불의 잔 영화 대본  <br />
: 위의 영화 대본 데이터 세트 중 해리 포터와 불의 잔 영화 대본 데이터 세트에 마법 주문 데이터가 누락되어 추가적인 대본 데이터를 활용하였습니다.  <br />
https://www.scriptslug.com/script/harry-potter-and-the-goblet-of-fire-2005  <br />
- 해리 포터 캐릭터 데이터 세트, 마법 주문 데이터 세트 <br />
: 해리 포터 전 시리즈에 등장하는 캐릭터와 마법 주문에 대한 데이터 세트를 활용하였습니다.  <br />
https://www.kaggle.com/gulsahdemiryurek/harry-potter-datase  <br />

2) 기술 스택 <br />
- python, MySql, Flask, Next.js, jupyter <br />

3) 사용된 라이브러리 <br />
- pymysql, Flask-Cors, Flasgger, Flask-restful, Jinja2, requests, react-bootstrap, react-chartjs-2, react-slick, slick-carousel, numpy, pandas, nltk, NRCLex, wordcloud, PIL, scikit-learn

## 2. 프로젝트 목표
1) 고객군(타겟층): <br />
영화 해리 포터 시리즈를 좋아하는 유저들로 설정하였습니다. <br />

2) 고객군의 문제:     
해리 포터 캐릭터, 마법 주문에 대한 정보를 원합니다. <br />
해리 포터와 관련된 유저가 액션할 수 있는 콘텐츠를 원합니다. <br />
*고객군의 문제를 파악하기 위하여 Google Trends에서 해리 포터 관련 검색어 급상승 순위 1~20위(기준 2021.03.31)를 활용하였습니다. <br />

3) 프로젝트 목표: <br />
해리 포터 시리즈 영화 대본 데이터 분석을 활용하여 해리 포터 캐릭터, 마법 주문에 대한 정보를 제공합니다. <br />
해리 포터와 관련된 유저가 액션할 수 있는 다양한 콘텐츠를 제공합니다. <br />

4) 프로젝트의 차별점: <br />
기존에 영화 해리 포터 시리즈에 대한 정보를 제공하는 웹 서비스들 중에서는 대본 데이터 분석을 통해 정보를 제공하는 웹 서비스가 거의 없었습니다. 본 프로젝트에서는 해리 포터 시리즈의 대본 데이터 분석을 통해 해리 포터 시리즈의 캐릭터와 마법 주문에 대한 정보를 제공한다는 점에서 차별점을 가집니다. 데이터 분석 결과를 활용하기 때문에 객관적인 정보를 전달할 수 있다는 점에서 이점을 가집니다. <br />

5) 프로젝트의 데이터 분석 결과가 주는 인사이트: <br />
해리 포터 시리즈의 대본 데이터 분석 결과는 다음과 같은 인사이트를 제공합니다. <br />
(1) 해리 포터 전 시리즈에서 대사량이 많은 캐릭터들은 누구인지 알 수 있습니다. <br />
(2) 해리 포터 전 시리즈에서 자주 사용되는 마법 주문은 무엇인지 알 수 있습니다.  <br />
(3) 해리 포터 시리즈의 각 영화에서 자주 사용되는 마법 주문이 무엇인지 알 수 있습니다.  <br />
(4) 해리 포터에 등장하는 캐릭터는 어떤 단어를 자주 말하는지 알 수 있습니다.   <br />
(5) 해리 포터에 등장하는 캐릭터는 어떤 마법 주문을 자주 사용하는지 알 수 있습니다.   <br />
(6) 해리 포터에 등장하는 캐릭터는 어떤 정서 타입을 어떠한 빈도로 표현하는지 알 수 있습니다. <br />

본 프로젝트가 제시하는 데이터 분석 결과는 해리 포터 시리즈의 주요 캐릭터와 주요하게 사용되는 마법 주문에 대한 인사이트와 캐릭터의 행동 특성에 대한 인사이트를 제공한다는 점에서 의의를 가집니다. 

6) 프로젝트 기대 효과:  <br />
해리 포터 영화 대본 데이터 분석 결과를 시각화하여 제시하는 것을 통해 해리 포터 시리즈에 대한 유저의 이해를 증진시킬 것을 기대합니다. 또한, 유저가 해리 포터 관련 콘텐츠와 상호작용하며 흥미로운 경험을 할 것을 기대합니다.

## 3. 프로젝트 기능 설명 
#### **[메인 기능]** <br /> 
1) 해리 포터 전 시리즈에 등장하는 캐릭터들의 대사 빈도 그래프
- 해리 포터 전 시리즈에서 대사 문장 수가 많은 순서대로 캐릭터 20명을 막대 그래프로 제시하였습니다. 

2) 해리 포터 전 시리즈에 등장하는 마법 주문 빈도 그래프
- 해리 포터 전 시리즈에서 대사에 등장한 횟수가 많은 순서대로 마법 주문 20개를 막대 그래프로 제시하였습니다. 

3) 해리 포터 시리즈의 각 영화에 등장하는 마법 주문 빈도 그래프
- 해리 포터 시리즈의 각 영화에서 대사에 등장한 횟수가 많은 순서대로 마법 주문 5개를 원 그래프(파이 차트)로 제시하였습니다. 

4) 캐릭터의 대사로 만든 워드 클라우드
- 캐릭터의 대사에 등장하는 단어들로 만든 워드 클라우드를 제시하였습니다. 

5) 캐릭터가 사용하는 마법 주문 빈도 그래프
- 캐릭터의 대사에 등장한 횟수가 많은 순서대로 마법 주문 5개를 원 그래프(파이 차트)로 제시하였습니다.

6) 캐릭터의 정서 유형별 표현 빈도 그래프
- 캐릭터가 8개의 정서(anger,anticipation,disgust,fear,joy,sadness,surprise,trust)를 표현하는 빈도를 막대 그래프로 제시하였습니다. 

#### **[서브 기능]** <br /> 
1) 죽음을 먹는 자들 테스트  <br />
- 해리 포터에 등장하는 죽음을 먹는 자들의 특징을 데이터 분석을 통해 파악하고, 데이터 분석 결과와 이외 죽음을 먹는 자들에 대한 정보를 활용하여 테스트를 구성하였습니다. 유저의 응답을 바탕으로 죽음을 먹는 자들과 얼마나 가까운지 결과를 제공합니다.  <br />

2) 해리 포터 밸런스 게임  <br />
- 해리 포터 세계관에 등장할 수 있는 상황들로 이루어진 밸런스 게임을 제공합니다. 유저들의 응답을 데이터베이스에 저장하여 유저들이 해당 선택지를 얼마나 선택했는지를 퍼센트로 제시합니다. <br /> 

3) 해리 포터 랜덤 편지  <br />
- 해리 포터에 나오는 캐릭터, 장소, 음식, 생물이 랜덤으로 등장하는 편지를 제공합니다. <br />

4) 해리 포터 랜덤 소설  <br />
- 해리 포터에 나오는 캐릭터, 장소, 음식, 생물, 마법 주문, 물건이 랜덤으로 나타나는 소설을 제공합니다. 소설 포맷은 6개의 포맷 중 랜덤으로 제시합니다.  <br />

5) 웹 서비스 및 팀원 소개 <br />
- 웹 서비스의 목표와 팀원에 대한 소개를 제공합니다. 

## 4. 프로젝트 구성도
- 와이어프레임/스토리보드 추가 <br />
![와이어프레임](uploads/ae7c827d11c2824816d2eb999a0c65dd/와이어프레임.png)

## 5. 프로젝트 팀원 역할 분담

| 이름 | 담당 업무 |
| ------ | ------ |
| 이찬미 | 리더/백엔드 개발/데이터 분석 |
| 김다인 | 백엔드 개발/데이터 분석 |
| 이슬기 | 프론트엔드 개발 |
| 정현구 | 프론트엔드 개발 |

### 역할 설명

1. 리더
- 기획 단계: 스크럼 진행, 프로젝트 기획, 프로젝트 제안서 작성
- 개발 단계: 스크럼 진행, 일정 조율, 콘텐츠 기획
- 수정 단계: 스크럼 진행, 피드백을 반영하여 기획 수정, 발표 준비

2. 프론트엔드
- 기획 단계: 문제 해결 아이디어 도출, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 웹 서비스 구현, 데이터 분석 결과 시각화, UI/UX 디자인 
- 수정 단계: 피드백 반영하여 프론트 디자인 수정

 3. 백엔드/데이터 분석
- 기획 단계: 데이터 분석을 통해 해결하고자 하는 문제를 정의
- 개발 단계: 데이터 베이스 구축, API 제작, API 문서화, 데이터 분석
- 수정 단계: 피드백 반영하여 데이터 분석 및 API 수정

## 6. 버전
  - 프로젝트의 버전 기입
ver 1.0

## 7. FAQ
  - 자주 받는 질문 정리 
(추후 업데이트 예정)