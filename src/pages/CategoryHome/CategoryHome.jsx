import { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as categoriesAPI from '../../utilities/categories-api';

export default function CategoryHome({campaign, category, setCategory}) {
    let { categoryId } = useParams();

    useEffect(function() {
        async function getCurCategory() {
            const curCategory = campaign.category.find((c) => c.name === categoryId);
            const updatedCategory = await categoriesAPI.populateCategory(curCategory._id)
            setCategory(updatedCategory)
        }
        getCurCategory();
    }, [categoryId]);

    return(
        <h1>{category.name}</h1>
    )
}