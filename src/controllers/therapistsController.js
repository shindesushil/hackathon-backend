const User = require('../models/UserModel');
const { OK, INTERNAL_SERVER_ERROR,BAD_REQUEST,NOT_FOUND } = require('../constants/errorCode');
const { messages } = require('../constants/messages');

exports.getAllTherapists = async (req, res) => {
  try {
    const therapists = await User.findAll({ 
      where: { signUpAs: "Therapists" },
    });

    
    if (!therapists.length) {
      return res.status(OK).json({ status: OK, message: "No therapists found", therapists: [] });
    }

    res.status(OK).json({ status: OK, message: "Therapists fetched successfully", therapists });


  } catch (error) {
    console.error("Error fetching therapists:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ status: INTERNAL_SERVER_ERROR, message: messages.INTERNAL_SERVER_ERROR });
  }
};

exports.getUserById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Validate ID
      if (!id || isNaN(id)) {
        return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message: "Invalid User ID" });
      }
  
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
  
      if (!user) {
        return res.status(NOT_FOUND).json({ status: NOT_FOUND, message: messages.NOT_FOUND });
      }
  
      res.status(OK).json({ status: OK, message: "User fetched successfully", user });
  
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(INTERNAL_SERVER_ERROR).json({ status: INTERNAL_SERVER_ERROR, message: messages.INTERNAL_SERVER_ERROR });
    }
  };


exports.getTherapistsBySpecialization = async (req, res) => {
    try {
      const { specialization } = req.body; // specialization passed in the request body
      
      // Validate Specialization
      if (!specialization || !['Depression', 'Anxiety', 'Adult ADHD', 'Social Anxiety', 'Women Health'].includes(specialization)) {
        return res.status(BAD_REQUEST).json({ status: BAD_REQUEST, message:messages.INVALID_OR_MISSING_SPECIALIZATION});
      }
  
      // Fetch therapists based on specialization
      const therapists = await User.findAll({
        where: { 
          signUpAs: 'Therapists',
          specialization: specialization
        },
        attributes: { exclude: ["password"] } // Exclude password field
      });
  
      if (therapists.length === 0) {
        return res.status(NOT_FOUND).json({ status: NOT_FOUND, message:messages.NO_THERAPISTS_FOUND_FOR_THE_GIVEN_SPECIALIZATION });
      }
  
      res.status(OK).json({ status: OK, message: "Therapists fetched successfully", therapists });
    } catch (error) {
      console.error("Error fetching therapists by specialization:", error);
      res.status(INTERNAL_SERVER_ERROR).json({ status: INTERNAL_SERVER_ERROR, message: messages.INTERNAL_SERVER_ERROR });
    }
  };
  

