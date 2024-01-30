import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CampaignHome({campaign, category, setCategory}) {
    let { categoryId } = useParams();

    useEffect(function() {
        function getCurCategory() {
            const curCategory = campaign.category.find((c) => c.name === categoryId);
            setCategory(curCategory)
        }
        getCurCategory();
    }, [categoryId]);

    return(
        <h1>{category.name}</h1>
    )
}