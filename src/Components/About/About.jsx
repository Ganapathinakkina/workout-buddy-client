import "./About.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import AboutImg1 from "../../Assets/aboutAssets/about_img-1.png";
import AboutImg2 from "../../Assets/aboutAssets/about_img-2.png";
import AboutImg3 from "../../Assets/aboutAssets/about_img-3.png";
import serviceImg1 from "../../Assets/aboutAssets/services/service_img-1.png";
import serviceImg2 from "../../Assets/aboutAssets/services/service_img-2.png";
import serviceImg3 from "../../Assets/aboutAssets/services/service_img-3.png"


const About = () => {

    const images = [AboutImg1, AboutImg2, AboutImg3]

    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    }

    return (
        <div className="aboutPage">
            <h1>About Us</h1>

            <div className="aboutContent">
                <div className="content">
                    <h3>- Know About Us</h3>
                    <p>Our goal is to make health and fitness attainable, affordable and approachable. At Workout Buddy, we believe that fitness is more than just lifting weights or running miles –
                        it's about consistency, motivation, and having the right support.</p>

                    <p> Whether you're a beginner or
                        an experienced athlete, our platform is designed to help you track workouts, set goals,
                        and stay motivated on your fitness journey.</p>
                </div>
                <div className="aboutImg">
                    <Slider {...settings}>

                        {images.map((image) => {
                            return (
                                <div key={image}>
                                    <img src={image} alt="" />
                                </div>)
                        })}
                    </Slider>
                </div>
            </div>

            <div className="missionContent">
                <h3>Our Mission</h3>
                <p>- Our mission is to empower individuals to lead healthier, stronger, and more active lives.</p>
                <p>- We aim to provide a simple yet powerful tool that keeps you accountable and helps you crush
                    your fitness goals.</p>
                <p>- Join Workout Buddy today and take the next step in your fitness journey.</p>
                <p>- Let’s get fit and stronger together!</p>
            </div>
            <div className="serviceContent">
                <div className="content">
                    <h3>Services we Provide</h3>
                    <p>- Get personalized workout plans tailored to your body measurements and fitness level.
                        Whether you're following expert-designed routines.</p>
                    <p>- creating your own custom workouts.</p>
                    <p>- Workout Buddy empowers you to train the way you want – effectively and efficiently!</p>
                </div>
                <div className="serviceCards">
                    <div className="card">
                        <img src={serviceImg1} alt="" />
                        <div className="cardContent">
                            <h4>EXERCISE</h4>
                            <p>Do exercise daily</p>
                            <p>Get your body fit</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src={serviceImg2} alt="" />
                        <div className="cardContent">
                            <h4>MEDITATION & YOGA</h4>
                            <p>Meditate daily</p>
                            <p>Be stronger mentally</p>
                        </div>
                    </div>
                    <div className="card">
                        <img src={serviceImg3} alt="" />
                        <div className="cardContent">
                            <h4>HEALTHY FOOD</h4>
                            <p>Take your food healthier</p>
                            <p>Get your body healthy from inside</p>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <p>- We are constantly evolving to bring you more ways to stay healthy and fit.
                        In the near future, we will introduce:</p>
                    <p>🧘‍♂️ <span>Yoga & Mindfulness –</span> Experience the benefits of yoga with guided sessions for
                        flexibility, relaxation, and stress relief.</p>
                    <p>🥗 <span>Personalized Diet Plans –</span> Get tailored food and nutrition recommendations based on
                        your fitness goals and body requirements.</p>
                    <p>- Join us on this exciting journey and take your fitness to the next level with Workout Buddy! 💪✨</p>
                </div>
            </div>
        </div>
    )
}

export default About