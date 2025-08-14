import profilePic from '../assets/images/pic.jpg';

export default function Info()
{
    return(
        <div>
        <header>
            <img src={profilePic} alt="profile pic"/>
            <h2>Muhammad Umar</h2>
            <h4>Frontend Developer</h4>
            <a href="mailto:muhammadumark900@gmail.com" className="website-link"></a>
            <div>
                <button>✉ Email</button>
                <a href="https://www.linkedin.com/in/muhammad-umar-k/" target='_blank' rel='noopener noreferrer'>
                    <button >💼 LinkedIn</button>
                </a>
            </div>
        </header>
        </div>
    )
}
