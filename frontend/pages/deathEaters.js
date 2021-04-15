import Layout from "../components/Layout";
import DeathEatersTest from '../components/deathEaters/deathEatersTest';
import questionList from '../public/Data/deatheaters.json'
import { Container, Row, Col} from 'react-bootstrap';
import styles from '../styles/deatheater.module.css'


function DeathEaters({ questionData }) {

    return (
        <Layout>
            <Container>
                <div className="container v-100">
                    <Row>
                        <Col>
                            <div style={{ paddingTop: "100px" }}>
                                <h2 className={styles.deH2} >죽음을 먹는 자들 테스트</h2>
                                <h3 className={styles.deH3}>당신이 얼마나 죽음을 먹는자에 가까운지 테스트를 해봅시다.</h3>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <DeathEatersTest props={questionData.data} />
                    </Row>
                </div>
            </Container>
        </Layout>
        )
}



export async function getStaticProps(context) {

    const questionData = questionList;

    return {
        props: { questionData },
    }

}

export default DeathEaters;