
import Layout from "../components/Layout";
import { Container, Row, Col} from 'react-bootstrap';
import Image from 'next/image'

function About() {

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '40px' }}>
                    <Col>
                        <h1>About Us</h1>
                    </Col>
                </Row>
                <Row style={{ textAlign: "left", marginTop: "3vh"}}>
                    <Col>
                        <h2>About 'All About Harry Potter'</h2>
                        <p>해리 포터 시리즈의 영화 대본 데이터 분석 결과를 시각화하여 제공합니다. 데이터 분석 결과를 통해 해리 포터 시리즈의 주요 캐릭터, 주요 마법 주문 그리고 캐릭터의 행동 특성에 대한 인사이트를 얻을 수 있습니다. 또한, 유저가 참여할 수 있는 해리 포터 세계관과 관련된 다양한 콘텐츠를 제공합니다. </p>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col sm={8} style={{ textAlign: "left"}}>
                        <h2>Who We Are</h2>
                        <p>Team:  Dumbledore's Army(DA)</p>
                        <p>(약자인 DA는 Data Analysis를 나타내기도 함.)</p>
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col style={{ textAlign: "left"}}>
                        <h2>Members</h2>
                    </Col>
                </Row>
                <Row xs={1} md={5}>
                    <Col >
                        <Image
                            priority
                            src="/images/myungseonim.jpg"
                            width={200}
                            height={300}
                        />
                        <p>정신적 지주 및 코치 : 강명서</p>
                    </Col>
                    <Col >
                        <Image
                            priority
                            src="/images/chanminim.png"
                            width={200}
                            height={300}
                        />
                        <p>리더 : 이찬미</p>
                    </Col>
                    <Col >
                        <Image
                            priority
                            src="/images/dainnim.png"
                            width={200}
                            height={300}
                        />
                        <p>백엔드 : 김다인</p>
                    </Col>
                    <Col >
                        <Image
                            priority
                            src="/images/hyungunim.png"
                            width={200}
                            height={300}
                        />
                        <p>프론트엔드 : 정현구</p>
                    </Col>
                    <Col >
                        <Image
                            priority
                            src="/images/seulkee.jpg"
                            width={200}
                            height={300}
                        />
                        <p>프론트엔드 : 이슬기</p>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default About;