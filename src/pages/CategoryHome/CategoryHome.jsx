import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as categoriesAPI from '../../utilities/categories-api';

export default function CampaignHome({campaign, category, setCategory}) {
    let { categoryId } = useParams();
    

    useEffect(function() {
        async function getCurCategory() {
            const curCategory = await categoriesAPI.getCurCategory(campaign, categoryId);
            setCategory(curCategory)
        }
        getCurCategory();
    }, []);

    return(
        <h1>{category.name}</h1>
    )
}