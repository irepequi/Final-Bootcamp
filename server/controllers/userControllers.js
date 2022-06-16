const connection = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserControllers {

  //1.- REGISTRAR Y CREAR USER

  createUser = (req, res) => {
    let img = "";

    if (req.file != undefined) {
      img = req.file.filename;
    }

    const {
      first_name,
      first_last_name,
      second_last_name,
      phone,
      email,
      password,
    } = JSON.parse(req.body.register);

    let saltRounds = 8;

    bcrypt.genSalt(saltRounds, function (err, saltRounds) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        let sql = `INSERT INTO user (first_name,
      first_last_name,
      second_last_name,
      phone,
      email,
      password,
      avatar
      ) VALUES ( '${first_name}', '${first_last_name}', '${second_last_name}', '${phone}', '${email}', '${hash}', '${img}' )`;
        connection.query(sql, (error, result) => {
          console.log(error);
          error
            ? res.status(400).json({ error })
            : res.status(200).json(result);
        });
      });
    });
  };

  //2.- LOGIN

  login = (req, res) => {
    let { email, password } = req.body;
    let sql = `SELECT * FROM user WHERE email = '${email}'`;

    connection.query(sql, (error, result) => {
      //en caso de error en la consulta
      if (error) return res.status(400).json(error);

      //en caso de no encontrar un user con dicho user_name o mail.
      if (!result || !result.length) {
        res.status(401).json("Usuario no registrado");
      } else {
        //en caso de que el mail o user_name SEA correcto
        //aqui lo estamos haciendo con el mail
        const [user] = result;
        const hash = user.password;

        //capturo el user_id
        const user_id = user.user_id;

        //comprobamos contraseñas
        bcrypt.compare(password, hash, (error, response) => {
          if (error) throw error;
          //si las contraseñas coinciden
          if (response === true) {
            const token = jwt.sign(
              {
                user: {
                  email: user.email,
                  type: user.type,
                  id: user.user_id,
                  name: user.first_name,
                  avatar: user.avatar,
                },
              },
              process.env.SECRET,
              { expiresIn: "10d" }
            );
            res.status(200).json({ token });
            //si las contraseñas coinciden
          } else {
            res.status(401).json("Los datos introducidos son incorrectos");
          }
        });
      }
    });
  };

  //3.- TEST

  sendResult = (req, res) => {
    const q1 = req.body[0].value;
    const q2 = req.body[1].value;
    const q3 = req.body[2].value;
    const q4 = req.body[3].value;
    const q5 = req.body[4].value;
    const q6 = req.body[5].value;
    const q7 = req.body[6].value;
    const q8 = req.body[7].value;
    const q9_invest_money = req.body[8].value;
    const q10 = req.body[9].value;
    const id = req.params.id;

    let sql = `INSERT INTO test_answer(user_id, q1, q2, q3, q4, q5, q6, q7, q8 ,q9_invest_money, q10) VALUES ( ${id}, ${q1}, ${q2}, ${q3}, ${q4}, ${q5}, ${q6}, ${q7}, ${q8}, "${q9_invest_money}", ${q10} )`;

    let sql2 = `UPDATE user SET test = "1" WHERE user_id = ${id}`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }

      connection.query(sql2, (error2, result2) => {
        if (error2) {
          console.log(error2);
          res.status(400).json({ error2 });
        }

        console.log(result, result2);
        res.status(200).json({ result2 });
      });
    });
  };

  // 4- TRAE LOS DATOS DE DATA

  getData = (req, res) => {
    const id = req.params.id;

    let sql = `SELECT * from inversor_data WHERE user_id = ${id}`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  // 5.-TRAE LOS DATOS DE UN USER

  getUser = (req, res) => {
    const id = req.params.id;

    let sql = `SELECT * from user WHERE user_id = ${id}`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //6.-ACTUALIZA DATOS DE USUARIO Y CREA DATOS DE DATA

  updateUser_createData = (req, res) => {
    const { user_id, first_name, first_last_name, second_last_name, data } =
      req.body;

    const { legal_name, birth_date, birth_place } = data;

   
    let sql = `INSERT INTO inversor_data (user_id, legal_name,birth_date, birth_place) VALUES (${user_id}, '${legal_name}', '${birth_date}', '${birth_place}')`;

    let sql2 = `UPDATE user SET first_name = '${first_name}', first_last_name = '${first_last_name}', second_last_name = '${second_last_name}' WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //7.-ACTUALIZA LOS DATOS DE USUARIO Y DE DATA

  updateUser_updateData = (req, res) => {
    const { user_id, first_name, first_last_name, second_last_name, data } =
      req.body;

    const { legal_name, birth_date, birth_place } = data;

    let sql = `UPDATE inversor_data SET user_id = ${user_id}, legal_name = '${legal_name}',birth_date = '${birth_date}', birth_place = '${birth_place}' WHERE user_id = ${user_id}`;

    let sql2 = `UPDATE user SET first_name = '${first_name}', first_last_name = '${first_last_name}', second_last_name = '${second_last_name}' WHERE user_id = ${user_id}`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }

      connection.query(sql2, (error2, result2) => {
        if (error2) {
          console.log(error2);
          res.status(400).json({ error2 });
        }

        res.status(200).json({ result2 });
      });
    });
  };

  //8.- TRAE LOS DATOS DE ADDRESS

  getAddress = (req, res) => {
    const id = req.params.id;

    let sql = `SELECT * from inversor_address WHERE user_id = ${id}`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //8.- CREA UN NUEVO ADDRESS

  creatAddress = (req, res) => {
    const id = req.params.id;

    const {
      address,
      city,
      province,
      country,
      postal_code,
      physical_residence,
      proof_address,
    } = req.body;

    let sql = `INSERT INTO inversor_address (user_id, address, city, province, postal_code, country, proof_address, physical_residence) VALUES (${id}, '${address}', '${city}', '${province}', '${postal_code}', '${country}', '${proof_address}', '${physical_residence}' )`;
    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //9.- ACTUALIZA ADDRESS

  updateAddress = (req, res) => {
    const id = req.params.id;

    const {
      address,
      city,
      province,
      country,
      postal_code,
      physical_residence,
      proof_address,
    } = req.body;

    let sql = `UPDATE inversor_address SET user_id = ${id}, address = '${address}', city = '${city}', province = '${province}', postal_code = '${postal_code}', country = '${country}', proof_address = '${proof_address}', physical_residence = ${physical_residence} WHERE user_id = ${id}`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //10.- ACTUALIZA ADDRESS/SUBE PROOF_ADDRESS

  updateAddressProof = (req, res) => {
    const id = req.params.id;
    const {
      address,
      city,
      province,
      country,
      postal_code,
      physical_residence,
    } = JSON.parse(req.body.address);

    const proof_address = req.file.filename;

    let sql = `UPDATE inversor_address SET user_id = ${id}, address = '${address}', city = '${city}', province = '${province}', postal_code = '${postal_code}', country = '${country}', proof_address = '${proof_address}', physical_residence = ${physical_residence} WHERE user_id = ${id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //11.- TRAE LOS DATOS DE JOB

  getJob = (req, res) => {
    const id = req.params.id;

    let sql = `SELECT * from inversor_job WHERE user_id = ${id}`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //12.- CREAR UN NUEVO JOB

  createJob = (req, res) => {
    const id = req.params.id;

    const {
      occupation,
      employer_name,
      person_public_respon,
      family_person_public_respon,
      proof_income,
    } = req.body;

    let sql = `INSERT INTO inversor_job (user_id, occupation, employer_name,person_public_respon, family_person_public_respon, proof_income) VALUES (${id}, '${occupation}', '${employer_name}', '${person_public_respon}', '${family_person_public_respon}', '${proof_income}')`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //13.- ACTUALIZA JOB

  updateJob = (req, res) => {
    const id = req.params.id;

    const {
      occupation,
      employer_name,
      person_public_respon,
      family_person_public_respon,
      proof_income,
    } = req.body;

    let sql = `UPDATE inversor_job SET user_id = ${id}, occupation  = '${occupation}', employer_name = '${employer_name}', person_public_respon = '${person_public_respon}', family_person_public_respon = '${family_person_public_respon}', proof_income = '${proof_income}' WHERE user_id = ${id}`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //14.- ACTUALIZA JOB Y PROOF_INCOME

  updateJobProof = (req, res) => {
    const id = req.params.id;

    const {
      occupation,
      employer_name,
      person_public_respon,
      family_person_public_respon,
    } = JSON.parse(req.body.job);

    const proof_income = req.file.filename;

    let sql = `UPDATE inversor_job SET user_id = ${id}, occupation  = '${occupation}', employer_name = '${employer_name}', person_public_respon = '${person_public_respon}', family_person_public_respon = '${family_person_public_respon}', proof_income = '${proof_income}' WHERE user_id = ${id}`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //15. TRAE LOS DATOS DE NATIONALITY

  getNationality = (req, res) => {
    const id = req.params.id;

    let sql = `SELECT * from inversor_nationality WHERE user_id = ${id}`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //16.- CREAR UN NUEVO NATIONALITY

  createNationality = (req, res) => {
    const id = req.params.id;

    const { nationality, type, legal_identification, proof_id } = req.body;

    let sql = `INSERT INTO inversor_nationality (user_id, nationality, type, legal_identification, proof_id) VALUES (${id}, '${nationality}', '${type}', '${legal_identification}' , '${proof_id}')`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //17.- ACTUALIZA NATIONALITY

  updateNationality = (req, res) => {
    const id = req.params.id;

    const { nationality, type, legal_identification, proof_id } = req.body;

    let sql = `UPDATE inversor_nationality SET user_id = ${id}, nationality  = '${nationality}', type = '${type}', legal_identification = '${legal_identification}', proof_id = '${proof_id}' WHERE user_id = ${id}`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //18.- ACTUALIZA NATIONALITY Y PROOF_ID

  updateNationalityProof = (req, res) => {
    const id = req.params.id;
    const { nationality, type, legal_identification } = JSON.parse(
      req.body.nationality
    );

    const proof_id = req.file.filename;

    let sql = `UPDATE inversor_nationality SET user_id = ${id}, nationality  = '${nationality}', type = '${type}', legal_identification = '${legal_identification}', proof_id = '${proof_id}' WHERE user_id = ${id}`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //19.- TRAE LOS DATOS DE TODO

  getFinal = (req, res) => {
    const id = req.params.id;

    let sql = `SELECT * from user, inversor_data, inversor_address, inversor_job, inversor_nationality WHERE user.user_id = ${id} and inversor_job.user_id = ${id} and inversor_data.user_id = ${id} and inversor_nationality.user_id = ${id} and inversor_address.user_id = ${id}`;

    connection.query(sql, (error, result) => {
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //20.- ACTUALIZAR TODO

  updateFinal = (req, res) => {
    const id = req.params.id;

    const {
      first_name,
      first_last_name,
      second_last_name,
      legal_name,
      email,
      phone,
      birth_place,
      address,
      city,
      province,
      postal_code,
      country,
      occupation,
      employer_name,
      nationality,
      type,
      legal_identification,
      person_public_respon,
      family_person_public_respon,
      physical_residence,
    } = req.body;

    let sql = `UPDATE user, inversor_data, inversor_address, inversor_job, inversor_nationality SET user.user_id = ${id}, first_name = '${first_name}', first_last_name = '${first_last_name}', legal_name = '${legal_name}', second_last_name = '${second_last_name}',test = "2", birth_place = '${birth_place}', phone = '${phone}', email = '${email}', address = '${address}', city = '${city}', province = '${province}', postal_code = '${postal_code}', country = '${country}', occupation = '${occupation}', employer_name = '${employer_name}', nationality  = '${nationality}', inversor_nationality.type = '${type}', legal_identification = '${legal_identification}', person_public_respon = '${person_public_respon}',family_person_public_respon = '${family_person_public_respon}', physical_residence = '${physical_residence}'  WHERE user.user_id = ${id} and inversor_job.user_id = ${id} and inversor_data.user_id = ${id} and inversor_nationality.user_id = ${id} and inversor_address.user_id = ${id}`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(error);

      error
        ? res.status(400).json({ error })
        : res.status(200).json({ result });
    });
  };

  //21.- TRAE LA INVERSIÓN DE UN USUARIO 
  
  getOneInvestment = (req, res) => {
    let { id } = req.params;

    let sql = `SELECT * FROM investment_fund WHERE user_id = ${id}`;
    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //22.- Traer los datos de un sector
  //localhost:4000/users/getOneSector/:sector_id
  getOneSector = (req, res) => {
    let { sector_id } = req.params;

    let sql = `SELECT * FROM investment_sector WHERE investment_sector_id = ${sector_id}`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //23.- Traer todos los datos de todas las inversiones filtradas
  //localhost:4000/users/getAllInvestments
  getAllInvestments = (req, res) => {
    const filter = req.body.buscador;

    let sql = `SELECT * FROM investment_fund JOIN investment_sector ON investment_fund.investment_sector_id = investment_sector.investment_sector_id WHERE investment_fund.company like "%${filter}%" OR investment_fund.geographic_focus LIKE "%${filter}%" OR investment_sector.sector_name LIKE "%${filter}%"`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //24.- Traer todos los datos de todas las inversiones habilitadas
  //localhost:4000/users/getAllInvestments
  getAllInvestmentsEnable = (req, res) => {
    let sql = `SELECT * FROM investment_fund JOIN investment_sector ON investment_fund.investment_sector_id = investment_sector.investment_sector_id WHERE investment_fund.deleted = 0`;

    connection.query(sql, (error, result) => {
      console.log(result);
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //25.- Traer todos los datos de todas las inversiones habilitadas que tiene un usuario
  //localhost:4000/users/getAllInvestmentsUser/:id
  getAllInvestmentsUser = (req, res) => {
    let { id } = req.params;

    let sql = `SELECT * FROM investment_fund JOIN investment_sector ON investment_fund.investment_sector_id = investment_sector.investment_sector_id JOIN investment ON investment.investment_fund_id = investment_fund.investment_fund_id WHERE investment_fund.deleted = 0 and investment.user_id = ${id} ORDER BY year_id and month_id DESC`;

    connection.query(sql, (error, result) => {
      if (error) {
        res.status(400).json({ error });
      }
      res.status(200).json(result);
    });
  };

  //26.- Resgistra una nueva inversion en el usuario
  //localhost:4000/users/amountInvest/:user_id/:investment_fund_id
  amountInvest = (req, res) => {
    let amount = req.body.amount;
    let { user_id, investment_fund_id } = req.params;

    //recogemos la fecha
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();

    let sql = `INSERT INTO investment (user_id, investment_fund_id, year_id, month_id, amount) values (${user_id}, ${investment_fund_id}, ${year}, ${month}, ${amount})`;

    connection.query(sql, (error, result) => {
      if (error) throw error;

      res.status(200).json(result);
    });
  };
}
module.exports = new UserControllers();
