import { connectToMongoDB } from '../session_db/db/db.mjs';

class Community {
    async fetchCommunityData(collectionName, communityId) {
        try {
            const db = await connectToMongoDB();
            const data = await db.collection(collectionName).find({}).toArray();
            if(collectionName === 'Community'){
                return data[0].community.find(element => element.communityId === communityId);
            }
            return data;

        } catch (error) {
            console.error('Error fetching community data from MongoDB:', error);
            throw error;
        }
    }

    async renderCommunity(req, res) {
        try {
            const communityId = req.body.communityId;
            const community = await this.fetchCommunityData('Community', communityId);
            const user = await this.fetchCommunityData('User', null)
            if (!community && !user) {
                res.status(403).end();
                return;
            }
            res.status(200).send({
                result: 'Successful rendering community!',
                community: community,
                user: user
            });
        } catch (error) {
            console.error('Error rendering community:', error);
            res.status(500).end();
        }
    }
}

export const community = new Community();
