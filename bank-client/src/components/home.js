
import VID from '../images/demoVid.mp4'

function Home() {



  return (
    <>

      <form className="form-home">
        <h3 className="header-login">ATM-Bank Simulation</h3>
        <div className='video-container'>
        <div className='video'>Here is a demo video for some of the features in site</div>
        <video width="500" height="500" controls className='video'>
          <source src={VID} type="video/mp4" />
        </video>

        <div className='info'>Hi! I'm Elias and this is my ATM Simulation web-site. This is a MERN stack application deployed on heroku, some of its features include, ability to register/login, create new bank account, deposit/withdraw to each individual account and ability to delete them, all of this with their proper input validation while at the same time storing the results in the database. Feel free to try it out! </div>
        </div>
      
      </form>
    </>
  );
}

export default Home;
