import axios from 'axios'
import Image from 'next/image'
import url from '../../../config/config'

function Wordcloud(props) { 
  const src = '/images/wordcloud/'+props.props
  return (
    <div>
      <Image 
        src= {src}
        alt="Picture of the author"
        width={563}
        height={423}
        />
    </div>
  )
}
export default Wordcloud