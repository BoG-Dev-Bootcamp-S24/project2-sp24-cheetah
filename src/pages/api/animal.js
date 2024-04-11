import createAnimal from "../../../server/mongodb/actions/create/createAnimal";
import deleteAnimal from "../../../server/mongodb/actions/delete/deleteAnimal";
import updateAnimalHours from "../../../server/mongodb/actions/update/updateAnimalHours";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        try {
            await createAnimal(req.body);
            return res.status(200).send("Success");
        } catch (e) {
            if (e.name === "ValidationError") {
                return res.status(400).send(e.message);
            }
            return res.status(500).send(e.message);
        }
    } else if (req.method == 'PATCH') {
        try {
            await updateAnimalHours(req.body);
            return res.status(200).send("Success");
        } catch (e) {
            if (e.name === "InvalidParametersError" || e.name === "AnimalNotFoundError") {
                return res.status(400).send(e.message);
            }
            return res.status(500).send(e.message);
        }
    } else if (req.method == 'DELETE') {
        try {
            await deleteAnimal(req.body);
            return res.status(200).send("Success");
        } catch (e) {
            if (e.name === "InvalidParametersError" || e.name === "AnimalNotFoundError") {
                return res.status(400).send(e.message);
            }
            return res.status(500).send(e.message);
        }
    }
}