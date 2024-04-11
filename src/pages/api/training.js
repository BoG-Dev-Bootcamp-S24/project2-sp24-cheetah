import createTraining from "../../../server/mongodb/actions/create/createTraining";
import deleteTraining from "../../../server/mongodb/actions/delete/deleteTraining";
import updateTraining from "../../../server/mongodb/actions/update/updateTraining";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            await createTraining(req.body);
            return res.status(200).send("Success");
        } catch (e) {
            if (e.name === "ValidationError") {
                return res.status(400).send(e.message);
            }
            return res.status(500).send(e.message);
        }
    } else if (req.method == 'PATCH') {
        try {
            await updateTraining(req.body);
            return res.status(200).send("Success");
        } catch (e) {
            if (e.name === "InvalidParametersError" || e.name === "TrainingLogNotFoundError") {
                return res.status(400).send(e.message);
            }
            return res.status(500).send(e.message);
        }
    } else if (req.method == 'DELETE') {
        try {
            await deleteTraining(req.body);
            return res.status(200).send("Success");
        } catch (e) {
            if (e.name === "InvalidParametersError" || e.name === "TrainingLogNotFoundError") {
                return res.status(400).send(e.message);
            }
            return res.status(500).send(e.message);
        }
    }
}