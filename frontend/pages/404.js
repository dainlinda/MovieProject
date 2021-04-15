import Layout from "../components/Layout";
import style from '../styles/error.module.css'

export default function Custom404() {
    return (
        <Layout>
            <div className={style.title}>
                <h1 className={style.h1}>SORRY,<br/>PAGE<br/>NOT FOUND</h1>
            </div>
        </Layout>
    )
}