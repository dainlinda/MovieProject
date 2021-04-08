import axios from 'axios'

const Spell = (props) => (
    <div>
        <h1>{props.id}</h1>
    </div>
  )
  
  Spell.getInitialProps = 
    async function() {
    const res = await axios.get('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.data
    console.log(data);
  
    return {
      data: data
    }
  }
  
  export default Spell