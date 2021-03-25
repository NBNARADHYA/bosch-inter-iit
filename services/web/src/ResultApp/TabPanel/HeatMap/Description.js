import React from "react"
import Typography from "@material-ui/core/Typography";

export default function Description() {
    return (
        <>
            <Typography variant="subtitle2" paragraph>
                “How can we trust a model?” and “How does it really make its decisions?” 
            </Typography>
            <Typography variant="body2" paragraph>
                When a model predicts or finds our insights, it takes certain decisions and choices. 
                Model interpretation tries to understand and explain these decisions taken 
                by the response function i.e., the what, why and how. The key to model interpretation 
                is transparency, the ability to question, and the ease of understanding model decisions by humans.
            </Typography>
            <Typography variant="body2">Some of the main questions which need to be answered :</Typography> 
            <Typography variant="body2" paragraph>
                <ol>
                    <li>
                        What drives model predictions? We should have the ability to query our model 
                        and find out latent feature interactions to get an idea of which features might 
                        be important in the decision-making policies of the model. <i>This ensures fairness of the model.</i>
                    </li>
                    <li>
                        Why did the model take a certain decision? We should also be able to validate and justify 
                        why certain key features were responsible in driving certain decisions taken by
                        a model during predictions. <i>This ensures accountability and reliability of the model.</i>
                    </li>
                    <li>
                        How can we trust model predictions? We should be able to evaluate and validate any 
                        data point and how a model takes decisions on it. This should be demonstrable and easy
                        to understand for key stakeholders that the model works as expected. 
                        <i>This ensures transparency of the model.</i>
                    </li>
                </ol>
            </Typography>
            <Typography variant="body2" paragraph style={{marginTop: "10px"}}>
                When tackling machine learning problems, we often have a tendency to fixate on 
                model performance metrics like accuracy, precision and recall and many more. 
                However, metrics only tell of a model’s predictive decisions. Over time, the performance 
                might change due to model concept drift caused by various factors in the environment. 
                Hence, it is of paramount importance to understand what drives a model to take certain decisions.
            </Typography>
            <Typography variant="body2" paragraph style={{marginTop: "10px"}}>
                Model interpretation helps us to interpret how our model approaches the decisions, 
                where it focuses on the input Images.
            </Typography>
            <Typography variant="body2" paragraph style={{marginTop: "10px"}}>
                Captum’s Gradient SHAP is a gradient method to compute SHAP values, 
                which are based on Shapley values proposed in cooperative game theory. 
                Gradient SHAP adds Gaussian noise to each input sample multiple times, 
                selects a random point along the path between baseline and input, and 
                computes the gradient of outputs with respect to those selected random points.
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                <i>Hence we can easily visualize where our model focuses.</i>
            </Typography>
        </>
    )
}