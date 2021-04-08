import axios from 'axios'

const Emotion = (props) => (
    <div>
        <h1>{props.id}</h1>
    </div>
  )
  
  Emotion.getInitialProps = 
    async function() {
    const res = await axios.get('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.data
    console.log(data);
  
    return {
      data: data
    }
  }
  
  export default Emotion