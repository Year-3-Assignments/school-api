import Sport from '../model/Sports'

    export async function createSport(req, res, next) {
        let sports = new Sport(req.body);
        await sports.save()
        .then((data) => {
            return res.status(200).json(data);
        })
        .catch(error => {
        return res.status(500).json(error.message);
        });
    }

    export async function getAllSportsDetails(req, res, next) {
        await Sport.findById(req.params.id)
        .sort({ createdAt: -1 })
        .populate('coach', '_id firstName lastName email phoneNumber addressLine1 addressLine2 city imageurl description')
        .populate('teamPlayers', '_id firstName lastName email phoneNumber addressLine1 addressLine2 city imageurl description')
        .then((data) => {
            response.sendRespond(res, data);
            return;
        })
        .catch(error => {
            response.handleError(res, error.message);
            return;
        });
    }

    export async function updateSport(req, res, next) {
        let sports = await SportsInventory.findById(req.body._id);
        if (!sports) {
          response.handleError(res, 'Sport not found');
          return;
        }
        let updateSportData = {
          name: req.body.name,
          coach: req.body.coach_id,
          teamPlayers: req.body.teamPlayers
        };
        await Sport.findByIdAndUpdate(req.body._id, updateSportData)
        .then(data => {
          response.sendRespond(res, data);
          return;
        })
        .catch(error => {
          response.handleError(res, error.message);
          return;
        });
    }
  
    export async function deleteSport(req, res, next) {
        await Sport.findByIdAndDelete(req.params.id)
        .then(data => {
            response.sendRespond(res, data);
            return;
        })
        .catch(error => {
            response.handleError(res, error.message);
            return;
        });
    }