import Layout from "../components/Layout";
import DeathEatersTest from '../components/deathEaters/deathEatersTest';
import questionList from '../public/Data/deatheaters.json'

function DeathEaters({ questionData }) {

    return (
        <Layout>
            <div className="page-header" >
                <div className="container v-100">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div style={{ paddingTop: "100px" }}>
                                <h2 style={{ fontSize: '46px', textAlign: 'center' }} >죽음을 먹는 자들 테스트</h2>
                                <h3>당신이 얼마나 죽음을 먹는자에 가까운지 테스트를 해봅시다.</h3>
                            </div>
                        </div>
                    </div>
                    <DeathEatersTest props={questionData.data} />
                </div>
            </div>
        </Layout>
        )
}



export async function getStaticProps(context) {

    const questionData = questionList;
    console.log(questionData.data)

    return {
        props: { questionData },
    }
}

export default DeathEaters;

