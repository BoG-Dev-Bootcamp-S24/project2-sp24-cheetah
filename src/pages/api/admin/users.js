import readUsers from "../../../../server/mongodb/actions/read/readUsers";

export default async function handler(req, res) {
    if (req.method == 'GET') {
        try {
            const result = await readUsers();
            return res.status(200).send(result);
        } catch (e) {
            return res.status(500).send(e.message);
        }
    }
}