
import { FaFacebook , FaTwitter, FaInstagram, FaGithub } from "react-icons/fa"

export default function SocialLink()
{
    return(
        <div className="social-links">
            <a href="https://www.instagram.com/maseed65?igsh=MWljZXV1cXBxZXBqbw==" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={35} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100011400169816" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={35} />
            </a>
            <a href="https://github.com/muhammad-umar-9" target="_blank" rel="noopener noreferrer">
                <FaGithub size={35} />
            </a>
            <a href="https://x.com/UmarGandapur900" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={35} />
            </a>
        </div>
    )
}
