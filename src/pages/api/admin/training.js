import readTrainings from "../../../../server/mongodb/actions/read/readTrainings";

export default async function handler(req, res) {
    if (req.method == 'GET') {
        try {
            const result = await readTrainings();
            return res.status(200).send(result);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
}