import './FullscreenImage.css'

export default function FullscreenImage({curImage, setCurrentMain}) {
    return (
        <div className='image-container'>
            <img onClick={() => setCurrentMain('CampaignDetail')} className="image" src={`https://college-of-lore-seir-1030.s3.us-west-2.amazonaws.com/${curImage}`} alt="" />
        </div>
    )
}