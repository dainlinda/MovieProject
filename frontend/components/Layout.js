import Header from "./Header";
import Head from 'next/head'


const Layout = props => (
    <div className="layout">
        <Head>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <div>
            <div className="stars"></div>
            <div className="twinkling"></div>
            {props.children}
        </div>
    </div>
);

export default Layout;