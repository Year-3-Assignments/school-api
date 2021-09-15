import Sport from '../model/Sports'
import User from '../model/User'
import Student from '../model/Student'
import responseHandler from '../response/response.handler';

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
        await Sport.find({})
        .sort({ createdAt: -1 })
        .populate('coach', '_id firstName lastName email phoneNumber addressLine1 addressLine2 city imageurl description')
        .populate('teamPlayers', '_id firstname lastname dateofbirth grade imageurl phone email')
        .then((data) => {
          responseHandler.respond(res, data);
        })
        .catch((error) => {
            responseHandler.handleError(res, error.message);
        });
    }

    export async function updateSport(req, res, next) {
        console.log( req.params.id , " ",req.body.coach, " " , req.body.teamPlayers);

        let sports = await Sport.findById(req.params.id);
        if (!sports) {
            responseHandler.handleError(res, 'Sport not found');
          return;
        }

        await Sport.findByIdAndUpdate(req.params.id,
          { 
            name: req.body.name,
            teamImageUrl: req.body.teamImageUrl,
            coach: req.body.coach,
            teamPlayers: req.body.teamPlayers
          },
          function(err, sport){
            console.log(sport);
            // console.log('saved');  
            }
        )
        .then(data => {
            responseHandler.respond(res, data);
          return;
        })
        .catch(error => {
            responseHandler.handleError(res, error.message);
          return;
        });
    }
  
    export async function deleteSport(req, res, next) {
        await Sport.findByIdAndDelete(req.params.id)
        .then(data => {
            responseHandler.respond(res, data);
            return;
        })
        .catch(error => {
            responseHandler.handleError(res, error.message);
            return;
        });
    }

    export async function getSportsCoach(req, res, next) {
      await User.find({role: 'COACH'}).select('firstName lastName imageurl')
      .sort({ createdAt: -1 })
      .then((data) => {
        responseHandler.respond(res, data);
      })
      .catch((error) => {
          responseHandler.handleError(res, error.message);
      });
  }

  export async function getSportsStudents(req, res, next) {
    await Student.find({}).select('firstname lastname imageurl grade')
    .sort({ createdAt: -1 })
    .then((data) => {
      responseHandler.respond(res, data);
    })
    .catch((error) => {
        responseHandler.handleError(res, error.message);
    });
}