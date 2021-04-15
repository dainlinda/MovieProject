
import Layout from "../components/Layout";
import seriesStyles from '../styles/series.module.css';

function About() {


    return (
        <Layout>
            <div className="container v-100">
                <div className="container v-100" style={{ marginTop: '40px' }}>
                    <p className={seriesStyles.pageTitle}>ABOUT</p><br/>
                </div>
            </div>
        </Layout>
    )
}

export default About;

