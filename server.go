package main

import (
	"github.com/gin-gonic/gin"
	"github.com/olahol/melody"
	"math/rand"
	"time"
	"strconv"
	"encoding/json"
	"database/sql"
	"net/http"
	"net/smtp"
	_ "github.com/go-sql-driver/mysql"
	"log"
	"strings"
	"reflect"
)

type User struct {
	aptitude_test string
	count string
	date_if_issue string
	email string
	license_category string
	license_number string
	license_type string
	name string
	password string
	phone string
	username string
}
type Login_User struct{
	result int
	name string
	username string
	reserves string
	email string
	license_id string
	license_category string
	license_number string
	license_type string
	date_if_issue string
	aptitude_test string
}
type Email struct {
	email string
}
type headerSetter struct {
	key, val string
	handler  http.Handler
}
type Rent1 struct {
	image string
	car_name string
	car_type string
	fuel string
	few string
	color string
	distance string
	registration_date string
	six_hour string
	ten_hour string
	twelve_hour string
	two_days string
	four_days string
	six_days string
	more string
	car_number string
}

type Reservation_History struct {
	image string
	car_number string
	car_name string
	car_type string
	fuel string
	color string
	distance string
	few string
	rental_point string
	return_point string
	rental_date string
	return_date string
}

type Impormation_car struct {
	image string
	available string
	car_number string
	car_name string
	color string
	car_type string
	fuel string
	few string
	distance string
	area string
	point string
	ider_repair string
	six_hour string
	ten_hour string
	twelve_hour string
	two_days string
	four_days string
	six_days string
	more string
}

type Feedback struct {
	name string
	email string
	phone string
	division string
	category string
	title string
	contents string
	timestamp string
}

type Total_reservation struct {
	name string
	email string
	username string
	number string
	image string
	car_number string
	car_name string
	color string
	cost string
	rental_date string
	return_date string
	rental_point string
	return_point string
	babyseat string
	navigation_kor string
	navigation_eng string
	damage_indemnity string
}

	func FloatToString(input_num float64) string {
		// to convert a float number to a string
		return strconv.FormatFloat(input_num, 'f', 6, 64)
	} 

 func send(email string, body string){
	 from := "hyepago@gmail.com"
	 pass := "9017thdud"
	 to := email

	 msg := "From: " + from + "\n" +
		"To: " + to + "\n" + 
		"Subject: 인증번호입니다.\n\n" +
		body


	err := smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
		from, []string{to}, []byte(msg))


	if err != nil {
		log.Printf("smtp err : %s", err)
		return
	}

	log.Println("sent, visit http://foobarbazz.mailinator.com")
 }
 func send_reservation(email string, body string){
	from := "hyepago@gmail.com"
	pass := "9017thdud"
	to := email

	msg := "From: " + from + "\n" +
	   "To: " + to + "\n" + 
	   "Subject: 예약번호입니다.\n\n" +
	   body


   err := smtp.SendMail("smtp.gmail.com:587",
	   smtp.PlainAuth("", from, pass, "smtp.gmail.com"),
	   from, []string{to}, []byte(msg))


   if err != nil {
	   log.Printf("smtp err : %s", err)
	   return
   }

   log.Println("sent, visit http://foobarbazz.mailinator.com")
}

func randInt(min int, max int) int {
	rand.Seed(time.Now().UTC().UnixNano())
	return min+rand.Intn(max-min)
}

func main() {
	router := gin.Default()
	m := melody.New()
	 
	//db_url := os.Getenv("root:111111@/rent")
	db, _ := sql.Open("mysql", "root:111111@/rent")

	router.GET("/", func(c *gin.Context) {
		http.ServeFile(c.Writer, c.Request, "./public/index.html")
	})

	router.GET("/bundle.js", func(c *gin.Context) {
		http.ServeFile(c.Writer, c.Request, "./public/bundle.js")
	})

	router.POST("/upload_image", func(c *gin.Context){
		form, err := c.MultipartForm()
		//log.Println(form.File["0"]) //v의 length가 1개가 아닐떄 에러
		//log.Println("len:",len(form.File["0"]))

		v := form.File["0"]

		if(len(v) != 1){ //개수가 1개가 아니면
			log.Println("Error: len(v) != 1 | ", len(v))
			return	
		}

		if err != nil {
			log.Println("Failed to upload image: ", err)
			return
		}

		const PATH = "http://localhost:5000/public/upload_image/"
		extension := strings.Split(v[0].Filename, ".")

		var id string
		var now = time.Now().String()

		for {
			now = time.Now().String()
			err := db.QueryRow("SELECT id FROM image where changed_filename=?", PATH + now + "." + extension[1]).Scan(&id)
			
			switch {
			case err == sql.ErrNoRows:
				break;
			case err != nil:
				log.Println(err)
			default:
				log.Println("LOG:: 이미 같은 파일명 존재 - ", PATH + now + "." + extension[1])
			}

			if id == "" {
				break;
			}
		}

		c.SaveUploadedFile(v[0], "/Users/samjung/documents/rental/public/upload_image/" + now + "." + extension[1]) //랜덤-바꾼파일명이 디렉터리에 있는지도 확인!!(있을경우 다시 파일이름 바꾸게)

		//err = db.QueryRow("SELECT id FROM image where original_filename = ?", v[0].Filename).Scan(&id)

		_, err = db.Exec("INSERT INTO image (original_filename, changed_filename) values (?, ?)", v[0].Filename, PATH + now + "."+extension[1])

		if err != nil {
				log.Fatal(err)
		}

		err = db.QueryRow("SELECT id FROM image where changed_filename=?", PATH + now + "." + extension[1]).Scan(&id)

		switch {
		case err == sql.ErrNoRows:
			log.Println("insert image, but select fault")
		case err != nil:
			log.Println(err)
		}

		// switch {
		// case err == sql.ErrNoRows:
		// 	_, err = db.Exec("INSERT INTO image (original_filename, changed_filename) values (?, ?)", v[0].Filename, "http://localhost:5000/public/upload_image/" + now + "."+extension[1])

		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}
		// case err != nil:
		// 	log.Println(err)
		// default:
		// 	_, err = db.Exec("UPDATE image set changed_filename = ? where original_filename = ?", "http://localhost:5000/public/upload_image/" + now + "."+extension[1], v[0].Filename)

		// 	if err != nil {
		// 		log.Fatal(err)
		// 	}
		// }

		/*url := c.PostForm("url")

		target_url := "http://localhost:5000/upload"
		filename := url
		postFile(filename, target_url)
		
		c.JSON(200, gin.H{

		})
		*/

		c.JSON(200, gin.H{
			"image_id": id,
		})
	})	

	router.POST("/id_overlap", func(c *gin.Context) {
		username := c.PostForm("username")
		err := db.QueryRow("SELECT id FROM users where username = ?", username).Scan(&username)

		switch{
		case err == sql.ErrNoRows:
			log.Println("LOG: 아이디 중복 없음")
			c.JSON(200, gin.H {
				"users": 't',
			})
		case err != nil:
			log.Println(err)
		default:
			log.Println("LOG: 아이디 중복 있음")
			c.JSON(200, gin.H {
				"users": 'f',
			})
		}
	})

	router.POST("/sign_in", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		var id string
		var phone string
		json.Unmarshal([]byte(form), &raw)

		username := raw["username"]
		password := raw["password"]

		var failures int		
		err := db.QueryRow("SELECT failures FROM users where username=?", username).Scan(&failures)

		var users Login_User

		switch{
		case err == sql.ErrNoRows:
			log.Println("LOG:: 아이디가 존재하지않아요.")
			//관리자
			err := db.QueryRow("SELECT id FROM admin where username = ? && password = ?", username, password).Scan(&id)

			switch{
			case err == sql.ErrNoRows:
				c.JSON(200, gin.H{ 
					"result": 0,
					"name": ' ',
					"username": ' ',
					"reserves": ' ',
					"email": ' ',
				})
				return;	
			case err != nil:
				log.Println(err)
			default:
				c.JSON(200, gin.H{ 
					"result": 5,
					"name": ' ',
					"username": ' ',
					"reserves": ' ',
					"email": ' ',
				})
				return;
			}
		case err != nil:
			log.Println(err)
			return;

		default:
			if failures > 5 {
				log.Println("LOG:: 5회 이상 틀리셨어요.")				
				c.JSON(200, gin.H{
					"result": 2,
					"name": ' ',
					"username": ' ',
					"reserves": ' ',
					"email": ' ',
				})
				return;
			}
		}

		err = db.QueryRow("SELECT license_id, name, username, point, email, phone FROM users where username=? && password=?", username, password).Scan(&users.license_id, &users.name, &users.username, &users.reserves, &users.email, &phone)

		switch{
		case err == sql.ErrNoRows:
			log.Println("LOG:: 비밀번호가 틀렸어요.")
			_, err = db.Exec("UPDATE users set failures=? where username=?",failures, username)
			c.JSON(200, gin.H{
				"result": 0,
				"name": ' ',
				"username": ' ',
				"reserves": ' ',
				"email": ' ',
			})
			return;
		case err != nil:
			log.Println(err)
			return;
		}

		err = db.QueryRow("SELECT category, type, number, date_if_issue, aptitude_test FROM license where id = ?", users.license_id).Scan(&users.license_category, &users.license_type, &users.license_number, &users.date_if_issue, &users.aptitude_test);

		switch{
		case err == sql.ErrNoRows:
			log.Println("운전면허정보가 없어요.")
			return;
		case err != nil:
			log.Println(err)
			return;
		}

		log.Println("LOG:: 로그인에 성공하셨어요!")
		_, err = db.Exec("UPDATE users set failures=? where username=?",0,username)
		log.Println("LOG:: 회원정보입니다!")
		
		c.JSON(200, gin.H{
			"result": 1,
			"name": users.name,
			"username": users.username,
			"reserves": users.reserves,
			"email": users.email,
			"license_category": users.license_category,
			"license_type": users.license_type,
			"license_number": users.license_number,
			"date_if_issue": users.date_if_issue,
			"aptitude_test": users.aptitude_test,
			"phone": phone,
		})
	})

	router.POST("/find_id", func(c *gin.Context) {
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		email := raw["email"]
		certification_number := raw["certification_number"]
		name := raw["name"]

		var username string

		var id int
		err := db.QueryRow("SELECT id FROM email_certification where email = ? && number = ?", email, certification_number).Scan(&id)

		switch{
		case err == sql.ErrNoRows:
			c.JSON(200, gin.H{
				"result": "email",
				"id": "",
			})
			return
		case err != nil:
			log.Println(err)
			return
		}

		err = db.QueryRow("SELECT username FROM users WHERE email = ? && name = ?", email, name).Scan(&username)

		switch{
		case err == sql.ErrNoRows:
			c.JSON(200, gin.H{
				"result": "impormation",
				"id": "",
			})
			return
		case err != nil:
			log.Println(err)
			return
		}

		c.JSON(200, gin.H{
			"result": "true",
			"id": username,
		})
	})

	router.POST("/find_pwd", func(c *gin.Context) {
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		email := raw["email"]
		certification_number := raw["certification_number"]
		name := raw["name"]
		username := raw["id"]

		var id int
		err := db.QueryRow("SELECT id FROM email_certification where email = ? && number = ?", email, certification_number).Scan(&id)

		switch{
		case err == sql.ErrNoRows:
			c.JSON(200, gin.H{
				"result": "email",
			})
			return
		case err != nil:
			log.Println(err)
			return
		}

		err = db.QueryRow("SELECT id FROM users WHERE email = ? && name = ? && username = ?", email, name, username).Scan(&id)

		switch{
		case err == sql.ErrNoRows:
			c.JSON(200, gin.H{
				"result": "impormation",
			})
			return
		case err != nil:
			log.Println(err)
			return
		}

		c.JSON(200, gin.H{
			"result": "true",
		})
	})

	router.POST("/change_pwd", func(c *gin.Context){
		form := c.PostForm("form")
		
		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		password := raw["password"]
		email := raw["email"]

		_, err := db.Exec("UPDATE users set password = ? WHERE email = ?", password, email)

		if err != nil {
			log.Fatal(err)

			c.JSON(200, gin.H{
				"result": "false",
			})
			return
		}

		c.JSON(200, gin.H{
			"result": "true",
		})
	})

	router.POST("/sign_up", func(c *gin.Context) {
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		name := raw["name"]
		username := raw["username"]	
		password := raw["password"]		
		email := raw["email"]
		phone := raw["phone"]
		
		// license
		license_category := raw["license_category"]
		license_type := raw["license_type"]
		license_number := raw["license_number"]
		date_if_issue := raw["date_if_issue"]
		aptitude_test := raw["aptitude_test"]
		certification_number := raw["certification_number"]
		
		var id int
		var user_id int
		
		err := db.QueryRow("SELECT id FROM email_certification where email = ? && number = ?", email, certification_number).Scan(&id)
		switch{
		case err == sql.ErrNoRows:
			c.JSON(200, gin.H{
				"result": "email",
			})
			return;
		case err != nil:
			log.Println(err)
		}
		
		err = db.QueryRow("SELECT id FROM license where number=?", license_number).Scan(&id)

		switch{
		case err == sql.ErrNoRows:
			_, err := db.Exec("INSERT INTO license (category, type, number, date_if_issue, aptitude_test) VALUES (?,?,?,?,?)",license_category, license_type, license_number, date_if_issue, aptitude_test)
			
			if err != nil {
				log.Fatal(err)
			}

			err = db.QueryRow("SELECT id FROM license where number=?", license_number).Scan(&id)
		case err != nil:
			log.Println(err)
			
		default:
			log.Println("이미 운전면허정보가 있데요!!")
			c.JSON(200, gin.H{
				"result":false,
			})
			return;
		}

		err = db.QueryRow("SELECT id FROM users where email=?", email).Scan(&user_id)

		switch{
		case err == sql.ErrNoRows:
		case err != nil:
		default:
			log.Println("이미 이메일이 있어요~!")
			c.JSON(200, gin.H{
				"result":false,
			})
			return;
		}

		_, err = db.Exec("INSERT INTO users (email, name, username, password, phone, license_id) VALUES (?, ?, ?, ?, ?, ?)", email, name, username, password, phone, id)

		if err != nil{
			log.Fatal(err)
		}

		c.JSON(200, gin.H{
			"result":true,
		})
	})

	router.POST("/email", func(c *gin.Context) {
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		email := raw["email"].(string)
		certification_number := strconv.Itoa(int(raw["certification_number"].(float64)))

		msg := "인증번호 : " + certification_number
		send(email, msg)

		var id int
		err := db.QueryRow("SELECT id FROM email_certification where email=?", email).Scan(&id)

		switch {
		case err == sql.ErrNoRows:
			_, err = db.Exec("INSERT email_certification set email=?, number=?", email, certification_number)
		case err != nil:
			log.Println(err)
		default:
			stmt, _ := db.Prepare("UPDATE email_certification set number=? WHERE email=?")
			_, err = stmt.Exec(certification_number, email)
		}		

		if err != nil {
			log.Fatal(err)
		} else {
			log.Println("email insert success")
		}

		c.JSON(200, gin.H{
			"result": "true",
		})
	})

	router.POST("/rent_1", func(c *gin.Context) {
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		//area := raw["area"]
		//return_point := raw["return_point"]
		rental_point := raw["rental_point"].(string)
		rental_date := raw["rental_date"]
		rental_time := raw["rental_time"]
		return_date := raw["return_date"]
		return_time := raw["return_time"]
		start_page := raw["start_number"]
		car_type := raw["car_type"]

		/*log.Println("rental_date : ", reflect.TypeOf(rental_date))
		log.Println("rental_time : ", reflect.TypeOf(rental_time))
		log.Println("return_date : ", reflect.TypeOf(return_date))
		log.Println("return_time : ", reflect.TypeOf(return_time))*/

		rentaldate := rental_date.(string) + " " + rental_time.(string) + ":00"
		//log.Println(rentaldate)
		returndate := return_date.(string) + " " + return_time.(string) + ":00"
		//log.Println(returndate)

		/*t_rentaldate, err := time.Parse("2006-01-02 15:04:05", rentaldate)
		t_returndate, err := time.Parse("2006-01-02 15:04:05", returndate)

		log.Println("t_rentaldate : ", t_rentaldate)
		log.Println("t_returndate : ", t_returndate)
		log.Println("t_retrundate - t_rentaldate : ", (t_returndate - t_rentaldate))*/

		var car_number string
		var id string
		
		count := 0
		index := 0

		var rent1 Rent1
		var result map[int]map[string]string = map[int]map[string]string{}

		rows, err := db.Query("SELECT car_number FROM reservation where ((rental_date >= ? && rental_date <= ?) || (return_date >= ? && return_date <= ?))", rentaldate, returndate, rentaldate, returndate)
		
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next() {
			err := rows.Scan(&car_number)

			if err != nil {
				log.Fatal(err)
			}

			_, err = db.Exec("UPDATE car SET available = ? where car_number = ?", 0, car_number)

			if err != nil {
				log.Fatal(err)
			}

			log.Println("LOG:: 사용불가능 차량 번호 : ", car_number)
		}

		if car_type != "" {
			car_type, err = strconv.Atoi(car_type.(string))

			if err != nil{
				log.Println("err : ", err)
			}
		}

		// 가격이 낮은 순으로 보여줘야 함.
		rows, err = db.Query("SELECT id FROM car_price ORDER BY six_hour")

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next() {
			err := rows.Scan(&id)

			result[index] = map[string]string{}

			if err != nil {
				log.Fatal(err)
			}

			if count < (int(start_page.(float64))-1) * 5 {
				count++;
				continue;
			}

			if car_type == "" || car_type == 0 {
				err = db.QueryRow("SELECT image, name, type, fuel, few, color, carprice_id, distance, registration_date, car_number FROM car where carprice_id=? && available=? && point=?", id, 1, rental_point).Scan(&rent1.image, &rent1.car_name, &rent1.car_type, &rent1.fuel, &rent1.few, &rent1.color, &id, &rent1.distance, &rent1.registration_date, &rent1.car_number)
			} else {
				err = db.QueryRow("SELECT image, name, type, fuel, few, color, carprice_id, distance, registration_date, car_number FROM car where carprice_id=? && available=? && type = ? && point=?", id, 1, car_type, rental_point).Scan(&rent1.image, &rent1.car_name, &rent1.car_type, &rent1.fuel, &rent1.few, &rent1.color, &id, &rent1.distance, &rent1.registration_date, &rent1.car_number)				
			}

			switch{
			case err == sql.ErrNoRows:
				continue;
			case err != nil:
				log.Println(err)
			default:
				err = db.QueryRow("SELECT six_hour, ten_hour, twelve, two_days, four_days, six_days, more FROM car_price where id = ?", id).Scan(&rent1.six_hour, &rent1.ten_hour, &rent1.twelve_hour, &rent1.two_days, &rent1.four_days, &rent1.six_days, &rent1.more)

				switch{
				case err == sql.ErrNoRows:
					log.Println("Not Found Car_price")
				case err != nil:
					log.Println(err)
				}

				err = db.QueryRow("SELECT changed_filename FROM image where id = ?", rent1.image).Scan(&rent1.image)

				result[index]["image"] = rent1.image
				result[index]["car_name"] = rent1.car_name
				result[index]["type"] = rent1.car_type
				result[index]["fuel"] = rent1.fuel
				result[index]["few"] = rent1.few
				result[index]["color"] = rent1.color
				result[index]["registration_date"] = rent1.registration_date
				result[index]["distance"] = rent1.distance
				result[index]["six_hour"] = rent1.six_hour
				result[index]["ten_hour"] = rent1.ten_hour
				result[index]["twelve_hour"] = rent1.twelve_hour
				result[index]["two_days"] = rent1.two_days
				result[index]["four_days"] = rent1.four_days
				result[index]["six_days"] = rent1.six_days
				result[index]["more"] = rent1.more
				result[index]["car_number"] = rent1.car_number

				count++;
				index++;
			}
			result[0]["total_count"] = strconv.Itoa(count);
		}

		_, err = db.Exec("UPDATE car SET available = ?", 1)

		if err != nil {
			log.Fatal(err)
		}

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/reservation", func(c *gin.Context) {
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		log.Println("form => ", form)

		reservation_number := raw["reservation_number"]
		email := raw["email"]
		car_number := raw["car_number"]
		cost := raw["cost"]
		rental_date := raw["rental_date"]
		return_date := raw["return_date"]
		rental_point := raw["rental_point"]
		return_point := raw["return_point"]
		babyseat := raw["babyseat"]
		kor_navigation := raw["kor_navigation"]
		eng_navigation := raw["eng_navigation"]
		cdw := raw["cdw"]
		usepoint := raw["usepoint"]

		var point int

		_, err := db.Exec("INSERT INTO reservation (number, email, car_number, cost, rental_date, return_date, rental_point, return_point, seat, navigation_korean, navigation_english, damage_indemnity) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",reservation_number, email, car_number, cost, rental_date, return_date, rental_point, return_point, babyseat, kor_navigation, eng_navigation, cdw)
		
		if err != nil {
			log.Fatal(err)
			c.JSON(200, gin.H {
				"result": false,
			})
			return;
		}

		err = db.QueryRow("SELECT point FROM users WHERE email = ?", email).Scan(&point)
		switch{
		case err == sql.ErrNoRows:
			return;
		case err != nil:
			log.Fatal(err)
		}

		// cost_number, err := strconv.Atoi(cost.(string))
		// log.Println("cost_number = ", cost_number)

		 type_cost := reflect.TypeOf(cost)

		var cost_number int

		if type_cost.Kind() == reflect.String {
			cost_number, err = strconv.Atoi(cost.(string))

			if err != nil {
				log.Fatal(err)
			}
		} else {
			cost_number = int(cost.(float64))
		}

		if usepoint != "" {
			usepoint_int, err := strconv.Atoi(usepoint.(string))
			point = point + (cost_number/100) - usepoint_int

			if err != nil {
				log.Fatal(err)
			}
		} else {
			point = point + (cost_number/100)
		}

		log.Println("point = ", point)

		_, err = db.Exec("UPDATE users SET point = ? where email = ?", point, email)

		if err != nil {
			log.Fatal(err)
		}


		c.JSON(200, gin.H {
			"result": point,
		})
	})

	router.POST("/send_reservation", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		// email := raw["email"].(string)
		// reservation_number := raw["reservation_number"].(string)
		email := raw["email"].(string)
		//reservation_number := floattostr(raw["reservation_number"].(float64))
		reservation_number := strconv.Itoa(int(raw["reservation_number"].(float64)))

		msg := "예약번호 : " + reservation_number
		send_reservation(email, msg)

		c.JSON(200, gin.H {
			"result": "true",
		})
	})

	router.POST("/reservation_history", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		email := raw["email"].(string)
		currentPage := raw["currentPage"]

		count := 0
		index := 0
		now := time.Now().String()

		var result map[int]map[string]string = map[int]map[string]string{}
		var car_number string
		var rental_date string
		var reservation_number string
		var reservation Reservation_History

		rows, err := db.Query("SELECT car_number, rental_date, number FROM reservation where email = ? ORDER BY id DESC", email)

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next(){
			err := rows.Scan(&car_number, &rental_date, &reservation_number)

			if err != nil{
				log.Fatal(err)
			}

			result[index] = map[string]string{}

			if err != nil {
				log.Fatal(err)
			}

			currentPage_number, err := strconv.Atoi(currentPage.(string))

			if count < (currentPage_number -1) * 5 {
				count++;
				continue;
			}

			err = db.QueryRow("SELECT image, car_number, name, type, fuel, color, distance, few FROM car WHERE car_number = ?", car_number).Scan(&reservation.image, &reservation.car_number, &reservation.car_name, &reservation.car_type, &reservation.fuel, &reservation.color, &reservation.distance, &reservation.few)
		
			switch{
			case err == sql.ErrNoRows:
				log.Println("LOG:: No Rows")
				continue;
			case err != nil:
				log.Println(err)
			}

			err = db.QueryRow("SELECT changed_filename FROM image where id = ?", reservation.image).Scan(&reservation.image)

			result[index]["image"] = reservation.image
			result[index]["car_number"] = reservation.car_number
			result[index]["car_name"] = reservation.car_name
			result[index]["car_type"] = reservation.car_type
			result[index]["fuel"] = reservation.fuel
			result[index]["color"] = reservation.color
			result[index]["distance"] = reservation.distance
			result[index]["few"] = reservation.few
			result[index]["reservation_number"] = reservation_number

			if rental_date <= now {
				result[index]["refundable"] = "false"
			} else {
				result[index]["refundable"] = "true"
			}

			count++
			index++

			result[0]["total_page"] = strconv.Itoa(count)
		}

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/refund_impormation", func(c *gin.Context){
		reservation_number := c.PostForm("reservation_number")
		var rental_point string
		var return_point string
		var rental_date string
		var return_date string

		err := db.QueryRow("SELECT rental_point, return_point, rental_date, return_date FROM reservation where number=?", reservation_number).Scan(&rental_point, &return_point, &rental_date, &return_date)

		switch{
		case err == sql.ErrNoRows:
			log.Println("No Rows")
		case err != nil:
			log.Println(err)
		}

		c.JSON(200, gin.H{
			"rental_point": rental_point,
			"return_point": return_point,
			"rental_date": rental_date,
			"return_date": return_date,
		})		
	})

	router.POST("/refund", func(c *gin.Context){
		reservation_number := c.PostForm("reservation_number")

		_, err := db.Exec("DELETE FROM reservation where number = ?",reservation_number)

		if err != nil {
			log.Fatal(err)
			c.JSON(200, gin.H {
				"result": "false",
			})
			return;
		}

		c.JSON(200, gin.H {
			"result": "true",
		})
	})

	router.POST("/upload_carprice", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		six_hour := raw["six_hour"]
		ten_hour := raw["ten_hour"]
		twelve_hour := raw["twelve_hour"]
		two_days := raw["two_days"]
		four_days := raw["four_days"]
		six_days := raw["six_days"]
		more := raw["more"]

		var id string

		_, err := db.Exec("INSERT INTO car_price (six_hour, ten_hour, twelve, two_days, four_days, six_days, more) values (?, ?, ?, ?, ?, ?, ?)", six_hour, ten_hour, twelve_hour, two_days, four_days, six_days, more)
		if err != nil {
			log.Fatal(err)
			c.JSON(200, gin.H{
				"id": "",
			})
			return;
		}

		err = db.QueryRow("SELECT id FROM car_price WHERE six_hour=? && ten_hour=? && twelve=? && two_days=? && four_days=? && six_days=? && more = ?", six_hour, ten_hour, twelve_hour, two_days, four_days, six_days, more).Scan(&id)

		switch{
		case err == sql.ErrNoRows:
			c.JSON(200, gin.H{
				"id": "",
			})
			return;
		case err != nil:
			log.Fatal(err)
			c.JSON(200, gin.H{
				"id": "",
			})
			return;
		}

		c.JSON(200, gin.H{
			"id": id,
		})
	})

	router.POST("/upload_car", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		image := raw["image"]
		car_number := raw["car_number"]
		color := raw["color"]
		car_type := raw["type"]
		fuel := raw["fuel"]
		few := raw["few"]
		distance := raw["distance"]
		area := raw["area"]
		point := raw["point"]
		car_priceid := raw["car_priceid"]
		name := raw["name"]

		var car_id string

		err := db.QueryRow("SELECT id FROM car WHERE car_number = ?", car_number).Scan(&car_id)

		switch{
		case err == sql.ErrNoRows:
		case err != nil:
			log.Fatal(err)
			c.JSON(200, gin.H{
				"result": "false",
			})
		default:
			c.JSON(200, gin.H{
				"result": "car_number",
			})
			return
		}

		_, err = db.Exec("INSERT INTO car (image, car_number, color, type, fuel, few, distance, area, point, carprice_id, name) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", image, car_number, color, car_type, fuel, few, distance, area, point, car_priceid, name)

		if err != nil {
			log.Fatal(err)
			c.JSON(200, gin.H{
				"reuslt": "false",
			})
			return;
		}

		c.JSON(200, gin.H{
			"result": "true",
		})
	})

	router.POST("/car_impormation", func(c *gin.Context){
		form := c.PostForm("form")
		
		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		currentPage := raw["currentPage"]
		input_car_type := raw["input_car_type"]
		sort := raw["sort"]

		var id string

		count := 0
		index := 0

		var result map[int]map[string]string = map[int]map[string]string{}
		var impormation Impormation_car
		var carprice_id string

		log.Println("sort = ", sort)

		rows, err := db.Query("SELECT id FROM car ORDER BY registration_date DESC")		

		if sort == "1" {
			rows, err = db.Query("SELECT id FROM car ORDER BY registration_date")
		}else{
			rows, err = db.Query("SELECT id FROM car ORDER BY registration_date DESC")	
		}

		if err != nil{
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next(){
			err := rows.Scan(&id)

			result[index] = map[string]string{}

			if err != nil {
				log.Fatal(err)
			}

			var startPage int

			if currentPage == "" {
				// if count < (int(currentPage.(float64))-1)*5 {
				// 	count++
				// 	continue
				// }
				startPage = 0
			} else{
				startPage, err = strconv.Atoi(currentPage.(string))
			}
			if count < ((startPage)-1)*5 {
				count++
				continue
			}

			if err != nil {
				log.Fatal(err)
			}

			if input_car_type == "" || input_car_type == "0" {
				input_car_type = 0
			}

			if input_car_type == 0 {
				err = db.QueryRow("SELECT image, available, car_number, color, type, fuel, few, distance, area, point, ider_repair, carprice_id, name FROM car WHERE id=?", id).Scan(&impormation.image, &impormation.available, &impormation.car_number, &impormation.color, &impormation.car_type, &impormation.fuel, &impormation.few, &impormation.distance, &impormation.area, &impormation.point, &impormation.ider_repair, &carprice_id, &impormation.car_name)
			} else {
				err = db.QueryRow("SELECT image, available, car_number, color, type, fuel, few, distance, area, point, ider_repair, carprice_id, name FROM car WHERE id = ? && type = ?", id, input_car_type).Scan(&impormation.image, &impormation.available, &impormation.car_number, &impormation.color, &impormation.car_type, &impormation.fuel, &impormation.few, &impormation.distance, &impormation.area, &impormation.point, &impormation.ider_repair, &carprice_id, &impormation.car_name)				
			}

			switch{
			case err == sql.ErrNoRows:
				log.Println("Not Found Rows impormation.image => ", impormation.image)
				continue
			case err != nil:
				log.Fatal(err)
			default:
				err = db.QueryRow("SELECT six_hour, ten_hour, twelve, two_days, four_days, six_days, more FROM car_price WHERE id = ?", carprice_id).Scan(&impormation.six_hour, &impormation.ten_hour, &impormation.twelve_hour, &impormation.two_days, &impormation.four_days, &impormation.six_days, &impormation.more)
			
				switch{
				case err == sql.ErrNoRows:
					log.Println("Not Found car_price, as id ", carprice_id)
				case err != nil:
					log.Fatal(err)
					return
				}

				err = db.QueryRow("SELECT changed_filename FROM image WHERE id = ?", impormation.image).Scan(&impormation.image)

				switch{
				case err == sql.ErrNoRows:
					return
				case err != nil:
					log.Fatal(err)
					return
				}

				result[index]["id"] = id
				result[index]["image"] = impormation.image
				result[index]["car_number"] = impormation.car_number
				result[index]["car_name"] = impormation.car_name
				result[index]["color"] = impormation.color
				result[index]["car_type"] = impormation.car_type
				result[index]["fuel"] = impormation.fuel
				result[index]["few"] = impormation.few
				result[index]["distance"] = impormation.distance
				result[index]["area"] = impormation.area
				result[index]["point"] = impormation.point
				result[index]["ider_repair"] = impormation.ider_repair
				result[index]["six_hour"] = impormation.six_hour
				result[index]["ten_hour"] = impormation.ten_hour
				result[index]["twelve_hour"] = impormation.twelve_hour
				result[index]["two_days"] = impormation.two_days
				result[index]["four_days"] = impormation.four_days
				result[index]["six_days"] = impormation.six_days
				result[index]["more"] = impormation.more

				count++
				index++
			}

			result[0]["total_count"] = strconv.Itoa(count)
		}

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/car_update", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		id := raw["id"]
		car_number := raw["car_number"]
		color := raw["color"]
		car_type := raw["car_type"]
		fuel := raw["fuel"]
		few := raw["few"]
		distance := raw["distance"]
		area := raw["area"]
		point := raw["point"]
		ider_repair := raw["ider_repair"]
		car_name := raw["car_name"]
		six_hour := raw["six_hour"]
		ten_hour := raw["ten_hour"]
		twelve_hour := raw["twelve_hour"]
		two_days := raw["two_days"]
		four_days := raw["four_days"]
		six_days := raw["six_days"]
		more := raw["more"]

		var carprice_id string

		_, err := db.Exec("UPDATE car SET car_number=?, color=?, type=?, fuel=?, few=?, distance=?, area=?, point=?, ider_repair=?, name=? where id=?", car_number, color, car_type, fuel, few, distance, area, point, ider_repair, car_name, id)
		if err != nil {
			log.Fatal(err)
			return;
		}

		err = db.QueryRow("SELECT carprice_id FROM car WHERE id = ?", id).Scan(&carprice_id)
		switch{
		case err == sql.ErrNoRows:
			log.Println("Not Found car_price");
			return;
		case err != nil:
			log.Fatal(err)
		}

		_, err = db.Exec("UPDATE car_price SET six_hour=?, ten_hour=?, twelve=?, two_days=?, four_days=?, six_days=?, more=? WHERE id = ?", six_hour, ten_hour, twelve_hour, two_days, four_days, six_days, more, carprice_id)

		if err != nil {
			log.Fatal(err)
			return;
		}

		c.JSON(200, gin.H{
			"result": "true",
		})
	})

	router.POST("/car_delete", func(c *gin.Context){
		id := c.PostForm("id")

		var carprice_id string
		
		err := db.QueryRow("SELECT carprice_id FROM car WHERE id = ?", id).Scan(&carprice_id)
		switch{
		case err == sql.ErrNoRows:
			log.Println("Not Found car_price")
			return;
		case err != nil:
			log.Fatal(err)
		}

		_, err = db.Exec("DELETE FROM car where id = ?", id)
		
		if err != nil {
			log.Fatal(err)
			return
		}

		_, err = db.Exec("DELETE FROM car_price where id = ?", carprice_id)

		if err != nil {
			log.Fatal(err)
			return
		}

		c.JSON(200, gin.H{
			"result": "true",
		})
	})

	router.POST("/email_certification", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		email := raw["email"]
		certification_number := raw["certification_number"]

		var id string

		err := db.QueryRow("SELECT id FROM email_certification WHERE email=? && number=?", email, certification_number).Scan(&id)

		switch{
		case err == sql.ErrNoRows:
			c.JSON(200, gin.H{
				"result": "false",
			})
		case err != nil:
			log.Println(err)
		default:
			c.JSON(200, gin.H{
				"result": "true",
			})
		}
	})

	router.POST("/upload_service_center", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		log.Println("raw => ", raw)

		name := raw["name"]
		email := raw["email"]
		phone := raw["phone"]
		division := raw["division"]
		category := raw["category"]
		title := raw["title"]
		contents := raw["contents"]

		_, err := db.Exec("INSERT INTO feedback (name, email, phone, divison, category, title, contents) VALUES (?,?,?,?,?,?,?)", name, email, phone, division, category, title, contents)

		if err != nil {
			log.Fatal(err)
		}

		c.JSON(200, gin.H{
			"result":"true",
		})
	})

	router.POST("/member_feedback_list", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		log.Println("raw => ", raw)

		email := raw["email"]
		currentPage := raw["currentPage"]
		division := raw["division"]
		category := raw["category"]
		sort := raw["sort"]

		count := 0
		index := 0

		var result map[int]map[string]string = map[int]map[string]string{}
		var id string
		var feedback Feedback

		rows, err := db.Query("SELECT id FROM feedback WHERE email = ?", email)

		if division == "" && category=="" {
			if sort == "1" {
				rows, err = db.Query("SELECT id FROM feedback WHERE email = ? ORDER BY timestamp", email)
			} else {
				rows, err = db.Query("SELECT id FROM feedback WHERE email = ? ORDER BY timestamp DESC", email)
			}
		} else if division=="" && category!="" {
			if sort == "1" {
				rows, err = db.Query("SELECT id FROM feedback WHERE email=? && category=? ORDER BY timestamp", email, category)
			}else{
				rows, err = db.Query("SELECT id FROM feedback WHERE email=? && category=? ORDER BY timestamp DESC", email, category)
			}
		} else if division!="" && category=="" {
			if sort == "1"{
				rows, err = db.Query("SELECT id FROM feedback WHERE email=? && divison=? ORDER BY timestamp", email, division)
			} else {
				rows, err = db.Query("SELECT id FROM feedback WHERE email=? && divison=? ORDER BY timestamp DESC", email, division)
			}
		} else if division!="" && category!="" {
			if sort == "1"{
				rows, err = db.Query("SELECT id FROM feedback WHERE email=? && divison=? && category=? ORDER BY timestamp", email, division, category)
			} else {
				rows, err = db.Query("SELECT id FROM feedback WHERE email=? && divison=? && category=? ORDER BY timestamp DESC", email, division, category)
			}
		}

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next() {
			err := rows.Scan(&id)
 
			if err != nil {
				log.Fatal(err)
				return;
			}
			startPage := 0

			result[index] = map[string]string{}

			if currentPage == "" {
				startPage = 0
			} else {
				startPage, err = strconv.Atoi(currentPage.(string))
			}

			if count < (startPage - 1) * 5{
				count++
				continue
			}

			err = db.QueryRow("SELECT name, email, phone, divison, category, title, contents, timestamp FROM feedback WHERE id = ?", id).Scan(&feedback.name, &feedback.email, &feedback.phone, &feedback.division, &feedback.category, &feedback.title, &feedback.contents, &feedback.timestamp)
			
			switch{
			case err == sql.ErrNoRows:
				log.Println("Not Found Rows")
				return;
			case err != nil:
				log.Fatal(err)
				return
			}

			result[index]["id"] = id
			result[index]["name"] = feedback.name
			result[index]["phone"] = feedback.phone
			result[index]["division"] = feedback.division
			result[index]["category"] = feedback.category
			result[index]["title"] = feedback.title
			result[index]["contents"] = feedback.contents
			result[index]["timestamp"] = feedback.timestamp

			count++
			index++

			result[0]["total_count"] = strconv.Itoa(count)
		}

		c.JSON(200, gin.H{
			"result": result,
		})
		
	})

	router.POST("/feedback_list", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		log.Println("LOG:: raw => ", raw)

		currentPage := raw["currentPage"]
		division := raw["division"]
		category := raw["category"]
		sort := raw["sort"]

		count := 0
		index := 0

		var result map[int]map[string]string = map[int]map[string]string{}
		var id string
		var feedback Feedback

		rows, err := db.Query("SELECT id FROM feedback")

		if division == "" && category=="" {
			if sort == "1" {
				rows, err = db.Query("SELECT id FROM feedback ORDER BY timestamp")
			} else {
				rows, err = db.Query("SELECT id FROM feedback ORDER BY timestamp DESC")
			}
		} else if division=="" && category!="" {
			if sort == "1" {
				rows, err = db.Query("SELECT id FROM feedback WHERE category=? ORDER BY timestamp", category)
			}else{
				rows, err = db.Query("SELECT id FROM feedback WHERE category=? ORDER BY timestamp DESC", category)
			}
		} else if division!="" && category=="" {
			if sort == "1"{
				rows, err = db.Query("SELECT id FROM feedback WHERE divison=? ORDER BY timestamp", division)
			} else {
				rows, err = db.Query("SELECT id FROM feedback WHERE divison=? ORDER BY timestamp DESC", division)
			}
		} else if division!="" && category!="" {
			if sort == "1"{
				rows, err = db.Query("SELECT id FROM feedback WHERE divison=? && category=? ORDER BY timestamp", division, category)
			} else {
				rows, err = db.Query("SELECT id FROM feedback WHERE divison=? && category=? ORDER BY timestamp DESC", division, category)
			}
		}

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next() {
			err := rows.Scan(&id)

			if err != nil {
				log.Fatal(err)
				return;
			}

			startPage := 0

			result[index] = map[string]string{}

			if currentPage == "" {
				startPage = 0
			} else {
				startPage, err = strconv.Atoi(currentPage.(string))
			}

			if count < (startPage - 1) * 5{
				count++
				continue
			}

			err = db.QueryRow("SELECT name, email, phone, divison, category, title, contents, timestamp FROM feedback WHERE id = ?", id).Scan(&feedback.name, &feedback.email, &feedback.phone, &feedback.division, &feedback.category, &feedback.title, &feedback.contents, &feedback.timestamp)

			switch {
			case err == sql.ErrNoRows:
				log.Println("Not Found Rows")
				return
			case err != nil:
				log.Fatal(err)
				return
			}

			result[index]["id"] = id
			result[index]["name"] = feedback.name
			result[index]["phone"] = feedback.phone
			result[index]["division"] = feedback.division
			result[index]["category"] = feedback.category
			result[index]["title"] = feedback.title
			result[index]["contents"] = feedback.contents
			result[index]["timestamp"] = feedback.timestamp

			count++
			index++

			result[0]["total_count"] = strconv.Itoa(count)
		}

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/search_car_impormation", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		currentPage := raw["currentPage"]
		input_car_type := raw["input_car_type"]
		sort := raw["sort"]
		search_select := raw["search_select"]
		search_text := raw["search_text"]

		var search_text_string string

		log.Println("search_text type of = ", reflect.TypeOf(search_text))

		type_search_text := reflect.TypeOf(search_text)

		if type_search_text.Kind() == reflect.String {
			search_text_string = search_text.(string)
		} else {
			search_text_string = FloatToString(search_text.(float64))
		}

		// if reflect.TypeOf(search_text) == (string) {
		// 	search_text_string = search_text.(string)
		// } else {
		// 	search_text_string = FloatToString(search_text.(float64))
		// }

		var like_text = "%" + search_text_string + "%"
		count := 0
		index := 0
		var id string
		var result map[int]map[string]string = map[int]map[string]string{}
		var impormation Impormation_car
		var carprice_id string

		rows, err := db.Query("SELECT id FROM car ORDER BY registration_date DESC")

		if sort == "1" {
			rows, err = db.Query("SELECT id FROM car ORDER BY registration_date")
		} else {
			rows, err = db.Query("SELECT id FROM car ORDER BY registration_date DESC")
		}

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next(){
			err := rows.Scan(&id)

			result[index] = map[string]string{}

			if err != nil {
				log.Fatal(err)
			}

			var startPage int

			if currentPage == "" {
				startPage = 0
			} else {
				startPage, err = strconv.Atoi(currentPage.(string))
			}

			if err != nil {
				log.Fatal(err)
			}

			if count < ((startPage) - 1) * 5 {
				count++
				continue
			}

			if err != nil {
				log.Fatal(err)
			}

			if input_car_type == "" || input_car_type == "0" {
				input_car_type = 0
			}
			
			if input_car_type == 0 {
				switch{
				case search_select == "1":
					err = db.QueryRow("SELECT image, available, car_number, color, type, fuel, few, distance, area, point, ider_repair, carprice_id, name FROM car WHERE id = ? && car_number LIKE ?", id, like_text).Scan(&impormation.image, &impormation.available, &impormation.car_number, &impormation.color, &impormation.car_type, &impormation.fuel, &impormation.few, &impormation.distance, &impormation.area, &impormation.point, &impormation.ider_repair, &carprice_id, &impormation.car_name)
				case search_select == "2":
					err = db.QueryRow("SELECT image, available, car_number, color, type, fuel, few, distance, area, point, ider_repair, carprice_id, name FROM car WHERE id = ? && name LIKE ?", id, like_text).Scan(&impormation.image, &impormation.available, &impormation.car_number, &impormation.color, &impormation.car_type, &impormation.fuel, &impormation.few, &impormation.distance, &impormation.area, &impormation.point, &impormation.ider_repair, &carprice_id, &impormation.car_name)
				case search_select == "3":
					err = db.QueryRow("SELECT image, available, car_number, color, type, fuel, few, distance, area, point, ider_repair, carprice_id, name FROM car WHERE id = ? && fuel LIKE ?", id, like_text).Scan(&impormation.image, &impormation.available, &impormation.car_number, &impormation.color, &impormation.car_type, &impormation.fuel, &impormation.few, &impormation.distance, &impormation.area, &impormation.point, &impormation.ider_repair, &carprice_id, &impormation.car_name)
				case search_select == "4":
					err = db.QueryRow("SELECT image, available, car_number, color, type, fuel, few, distance, area, point, ider_repair, carprice_id, name FROM car WHERE id = ? &&  color LIKE ?", id, like_text).Scan(&impormation.image, &impormation.available, &impormation.car_number, &impormation.color, &impormation.car_type, &impormation.fuel, &impormation.few, &impormation.distance, &impormation.area, &impormation.point, &impormation.ider_repair, &carprice_id, &impormation.car_name)
				case search_select == "5":
					err = db.QueryRow("SELECT image, available, car_number, color, type, fuel, few, distance, area, point, ider_repair, carprice_id, name FROM car WHERE id = ? && few = ?", id, search_text).Scan(&impormation.image, &impormation.available, &impormation.car_number, &impormation.color, &impormation.car_type, &impormation.fuel, &impormation.few, &impormation.distance, &impormation.area, &impormation.point, &impormation.ider_repair, &carprice_id, &impormation.car_name)
				}
			} else {
				switch{
				case search_select == "1":
					err = db.QueryRow("SELECT image, available, car_number, color, type, fuel, few, distance, area, point, ider_repair, carprice_id, name FROM car WHERE id = ? && car_number LIKE ? && type = ?", id, like_text, input_car_type).Scan(&impormation.image, &impormation.available, &impormation.car_number, &impormation.color, &impormation.car_type, &impormation.fuel, &impormation.few, &impormation.distance, &impormation.area, &impormation.point, &impormation.ider_repair, &carprice_id, &impormation.car_name)
				case search_select == "2":
					err = db.QueryRow("SELECT image, available, car_number, color, type, fuel, few, distance, area, point, ider_repair, carprice_id, name FROM car WHERE id = ? && name LIKE ? && type = ?", id, like_text, input_car_type).Scan(&impormation.image, &impormation.available, &impormation.car_number, &impormation.color, &impormation.car_type, &impormation.fuel, &impormation.few, &impormation.distance, &impormation.area, &impormation.point, &impormation.ider_repair, &carprice_id, &impormation.car_name)
				case search_select == "3":
					err = db.QueryRow("SELECT image, available, car_number, color, type, fuel, few, distance, area, point, ider_repair, carprice_id, name FROM car WHERE id = ? && fuel LIKE ? && type = ?", id, like_text, input_car_type).Scan(&impormation.image, &impormation.available, &impormation.car_number, &impormation.color, &impormation.car_type, &impormation.fuel, &impormation.few, &impormation.distance, &impormation.area, &impormation.point, &impormation.ider_repair, &carprice_id, &impormation.car_name)
				case search_select == "4":
					err = db.QueryRow("SELECT image, available, car_number, color, type, fuel, few, distance, area, point, ider_repair, carprice_id, name FROM car WHERE id = ? &&  color LIKE ? && type = ?", id, like_text, input_car_type).Scan(&impormation.image, &impormation.available, &impormation.car_number, &impormation.color, &impormation.car_type, &impormation.fuel, &impormation.few, &impormation.distance, &impormation.area, &impormation.point, &impormation.ider_repair, &carprice_id, &impormation.car_name)
				case search_select == "5":
					err = db.QueryRow("SELECT image, available, car_number, color, type, fuel, few, distance, area, point, ider_repair, carprice_id, name FROM car WHERE id = ? && few = ? && type = ?", id, search_text, input_car_type).Scan(&impormation.image, &impormation.available, &impormation.car_number, &impormation.color, &impormation.car_type, &impormation.fuel, &impormation.few, &impormation.distance, &impormation.area, &impormation.point, &impormation.ider_repair, &carprice_id, &impormation.car_name)
				}
			}
			
			switch{
			case err == sql.ErrNoRows:
				log.Println("Not Found Rows")
				continue
			case err != nil:
				log.Fatal(err)
				return
			default:
				err = db.QueryRow("SELECT six_hour, ten_hour, twelve, two_days, four_days, six_days, more FROM car_price WHERE id = ?", carprice_id).Scan(&impormation.six_hour, &impormation.ten_hour, &impormation.twelve_hour, &impormation.two_days, &impormation.four_days, &impormation.six_days, &impormation.more)
			
				switch{
				case err == sql.ErrNoRows:
					log.Println("Not Found car_price, as id ", carprice_id)
				case err != nil:
					log.Fatal(err)
					return
				}

				err = db.QueryRow("SELECT changed_filename FROM image WHERE id = ?", impormation.image).Scan(&impormation.image)

				switch {
				case err == sql.ErrNoRows:
					return
				case err != nil:
					log.Fatal(err)
					return
				}

				result[index]["id"] = id
				result[index]["image"] = impormation.image
				result[index]["car_number"] = impormation.car_number
				result[index]["car_name"] = impormation.car_name
				result[index]["color"] = impormation.color
				result[index]["car_type"] = impormation.car_type
				result[index]["fuel"] = impormation.fuel
				result[index]["few"] = impormation.few
				result[index]["distance"] = impormation.distance
				result[index]["area"] = impormation.area
				result[index]["point"] = impormation.point
				result[index]["ider_repair"] = impormation.ider_repair
				result[index]["six_hour"] = impormation.six_hour
				result[index]["ten_hour"] = impormation.ten_hour
				result[index]["twelve_hour"] = impormation.twelve_hour
				result[index]["two_days"] = impormation.two_days
				result[index]["four_days"] = impormation.four_days
				result[index]["six_days"] = impormation.six_days
				result[index]["more"] = impormation.more

				count++
				index++
			}

			result[0]["total_count"] = strconv.Itoa(count)
		}

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/reservation_non_member", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		email := raw["email"]
		reservation_number := raw["reservation_number"]

		now := time.Now().String()

		var result map[string]string = map[string]string{}
		var reservation Reservation_History

		err := db.QueryRow("SELECT car_number, rental_date, return_date, rental_point, return_point FROM reservation WHERE number = ? && email=?", reservation_number, email).Scan(&reservation.car_number, &reservation.rental_date, &reservation.return_date, &reservation.rental_point, &reservation.return_point)

		switch{
		case err == sql.ErrNoRows:
			return
		case err != nil:
			log.Fatal(err)
			return
		}

		err = db.QueryRow("SELECT image, name, type, fuel, color, distance, few FROM car WHERE car_number = ?", reservation.car_number).Scan(&reservation.image, &reservation.car_name, &reservation.car_type, &reservation.fuel, &reservation.color, &reservation.distance, &reservation.few)
		switch{
		case err == sql.ErrNoRows:
			return
		case err != nil:
			return
		}

		err = db.QueryRow("SELECT changed_filename FROM image WHERE id = ?", reservation.image).Scan(&reservation.image)

		result["image"] = reservation.image
		result["car_number"] = reservation.car_number
		result["car_name"] = reservation.car_name
		result["fuel"] = reservation.fuel
		result["color"] = reservation.color
		result["distance"] = reservation.distance
		result["few"] = reservation.few
		result["rental_point"] = reservation.rental_point
		result["return_point"] = reservation.return_point
		result["rental_date"] = reservation.rental_date
		result["return_date"] = reservation.return_date

		if reservation.rental_date <= now {
			result["refundable"] = "false"
		} else {
			result["refundable"] = "true"
		}

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/mypage_change_pwd", func(c *gin.Context) {
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		var id string

		email := raw["email"]
		password := raw["password"]
		update_password := raw["update_password"]

		err := db.QueryRow("SELECT id FROM users WHERE email=? && password=?", email, password).Scan(&id)
		switch{
		case err == sql.ErrNoRows:
			c.JSON(200, gin.H{
				"result": "false",
			})
			return
		case err != nil:
			log.Fatal(err)
			return
		}

		_, err = db.Exec("UPDATE users set password=? WHERE email = ?", update_password, email)

		if err != nil{
			log.Fatal(err)
			return
		}

		c.JSON(200, gin.H {
			"result": "true",
		})
	})

	router.POST("/update_email", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		email := raw["email"]
		update_email := raw["update_email"]

		log.Println("email = ", email)
		log.Println("update_email = ", update_email)

		_, err := db.Exec("UPDATE users set email=? WHERE email=?", update_email, email)

		if err != nil {
			log.Fatal(err)

			c.JSON(200, gin.H{
				"result": "false",
			})
			return
		}

		_, err = db.Exec("UPDATE feedback set email=? WHERE email=?", update_email, email)
		if err != nil {
			log.Fatal(err)

			c.JSON(200, gin.H{
				"result": "false",
			})
			return
		}

		_, err = db.Exec("UPDATE reservation set email=? WHERE email=?", update_email, email)
		if err != nil {
			log.Fatal(err)

			c.JSON(200, gin.H{
				"result": "false",
			})
			return
		}

		c.JSON(200, gin.H {
			"result": "true",
		})
	})

	router.POST("/update_user_impormation", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		var license_id string

		email := raw["email"]
		phone := raw["phone"]
		license_category := raw["license_category"]
		license_type := raw["license_type"]
		license_number := raw["license_number"]
		date_if_issue := raw["date_if_issue"]
		aptitude_test := raw["aptitude_test"]

		_, err := db.Exec("UPDATE users set phone=? WHERE email=?", phone, email)
		if err != nil {
			log.Fatal(err)

			c.JSON(200, gin.H{
				"result": "false",
			})

			return
		}

		err = db.QueryRow("SELECT license_id FROM users WHERE email = ?", email).Scan(&license_id)

		switch{
		case err == sql.ErrNoRows:
			c.JSON(200, gin.H {
				"result": "false",
			})

			return
		case err != nil :
			log.Fatal(err)
			c.JSON(200, gin.H{
				"result": "false",
			})
			return
		}

		_, err = db.Exec("UPDATE license set category=?, type=?, number=?, date_if_issue=?, aptitude_test=? WHERE id = ?", license_category, license_type, license_number, date_if_issue, aptitude_test, license_id)

		if err != nil {
			log.Fatal(err)

			c.JSON(200, gin.H{
				"result": "false",
			})
			return
		}

		c.JSON(200, gin.H{
			"result": "true",
		})
	})

	router.POST("/upload_notice", func(c *gin.Context) {
		log.Println("LOG: /rent_1")
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		title := raw["title"]
		content := raw["content"]

		_, err := db.Exec("INSERT INTO notice (title, contents) VALUES (?, ?)", title, content)	

		if err != nil {
			log.Fatal(err)
			c.JSON(200, gin.H{
				"result": "false",
			})
			return
		}

		c.JSON(200, gin.H{
			"result": "true",
		})
	})

	router.POST("/notice_list", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		sort := raw["sort"]
		currentPage := raw["currentPage"]

		count := 0
		index := 0

		var id string
		var title string
		var contents string
		var timestamp string

		var result map[int]map[string]string = map[int]map[string]string{}

		rows, err := db.Query("SELECT id FROM notice")

		if sort == "1"{
			rows, err = db.Query("SELECT id FROM notice ORDER BY timestamp")
		} else {
			rows, err = db.Query("SELECT id FROM notice ORDER BY timestamp DESC")
		}

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next(){
			err := rows.Scan(&id)

			if err != nil {
				log.Fatal(err)
				return
			}

			startPage := 0

			result[index] = map[string]string{}

			if currentPage == "" {
				startPage = 0
			} else {
				startPage, err = strconv.Atoi(currentPage.(string))
			}

			if count < (startPage - 1) * 20 {
				count++; 
				continue;
			}

			err = db.QueryRow("SELECT title, contents, timestamp FROM notice WHERE id = ?", id).Scan(&title, &contents, &timestamp)

			switch{
			case err == sql.ErrNoRows:
				return
			case err != nil:
				log.Fatal(err)
				return
			}

			result[index]["id"] = id
			result[index]["title"] = title
			result[index]["content"] = contents
			result[index]["timestamp"] = timestamp

			count++
			index++

			result[0]["total_count"] = strconv.Itoa(count)
		}

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/update_notice", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		id := raw["id"]
		title := raw["title"]
		content := raw["content"]

		_, err := db.Exec("UPDATE notice set title=?, contents=? WHERE id = ?", title, content, id)

		if err != nil {
			log.Fatal(err)
			c.JSON(200, gin.H{
				"result": "false",
			})
			return
		}

		c.JSON(200, gin.H{
			"result": "true",
		})
	})

	router.POST("/search_member_feedback", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		log.Println("raw => ", raw)

		currentPage := raw["currentPage"]
		email := raw["email"]
		division := raw["division"]
		category := raw["category"]
		sort := raw["sort"]
		search_text := raw["search_text"]
		search_select := raw["search_select"]

		var search_text_string string

		log.Println("search_text type of = ", reflect.TypeOf(search_text))

		type_search_text := reflect.TypeOf(search_text)

		if type_search_text.Kind() == reflect.String {
			search_text_string = search_text.(string)
		} else {
			search_text_string = FloatToString(search_text.(float64))
		}

		var like_text = "%" + search_text_string + "%"

		count := 0
		index := 0
		
		var result map[int]map[string]string = map[int]map[string]string{}
		var id string
		var feedback Feedback

		rows, err := db.Query("SELECT id FROM feedback WHERE email = ?", email)

		if division == "" && category=="" {
			if sort == "1" {
				rows, err = db.Query("SELECT id FROM feedback WHERE email = ? ORDER BY timestamp", email)
			} else {
				rows, err = db.Query("SELECT id FROM feedback WHERE email = ? ORDER BY timestamp DESC", email)
			}
		} else if division=="" && category!="" {
			if sort == "1" {
				rows, err = db.Query("SELECT id FROM feedback WHERE email=? && category=? ORDER BY timestamp", email, category)
			}else{
				rows, err = db.Query("SELECT id FROM feedback WHERE email=? && category=? ORDER BY timestamp DESC", email, category)
			}
		} else if division!="" && category=="" {
			if sort == "1"{
				rows, err = db.Query("SELECT id FROM feedback WHERE email=? && divison=? ORDER BY timestamp", email, division)
			} else {
				rows, err = db.Query("SELECT id FROM feedback WHERE email=? && divison=? ORDER BY timestamp DESC", email, division)
			}
		} else if division!="" && category!="" {
			if sort == "1"{
				rows, err = db.Query("SELECT id FROM feedback WHERE email=? && divison=? && category=? ORDER BY timestamp", email, division, category)
			} else {
				rows, err = db.Query("SELECT id FROM feedback WHERE email=? && divison=? && category=? ORDER BY timestamp DESC", email, division, category)
			}
		}

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()
	
		for rows.Next() {
			err := rows.Scan(&id)
	
			if err != nil {
				log.Fatal(err)
				return;
			}
			startPage := 0
	
			result[index] = map[string]string{}
	
			if currentPage == "" {
				startPage = 0
			} else {
				startPage, err = strconv.Atoi(currentPage.(string))
			}
	
			if count < (startPage - 1) * 5{
				count++
				continue
			}
	
			switch{
			case search_select == "1":
				err = db.QueryRow("SELECT name, email, phone, divison, category, title, contents, timestamp FROM feedback WHERE id = ? && title LIKE ?", id, like_text).Scan(&feedback.name, &feedback.email, &feedback.phone, &feedback.division, &feedback.category, &feedback.title, &feedback.contents, &feedback.timestamp)
			case search_select == "2":
				err = db.QueryRow("SELECT name, email, phone, divison, category, title, contents, timestamp FROM feedback WHERE id = ? && contents LIKE ?", id, like_text).Scan(&feedback.name, &feedback.email, &feedback.phone, &feedback.division, &feedback.category, &feedback.title, &feedback.contents, &feedback.timestamp)
			}
			
			switch{
			case err == sql.ErrNoRows:
				log.Println("Not Found Rows")
				continue;
			case err != nil:
				log.Fatal(err)
				return
			}
	
			result[index]["id"] = id
			result[index]["name"] = feedback.name
			result[index]["phone"] = feedback.phone
			result[index]["division"] = feedback.division
			result[index]["category"] = feedback.category
			result[index]["title"] = feedback.title
			result[index]["contents"] = feedback.contents
			result[index]["timestamp"] = feedback.timestamp
	
			count++
			index++
	
			result[0]["total_count"] = strconv.Itoa(count)
		}
	
		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/search_notice", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		sort := raw["sort"]
		currentPage := raw["currentPage"]
		search_text := raw["search_text"]
		search_select := raw["search_select"]

		var result map[int]map[string]string = map[int]map[string]string{}
		var id string
		var title string
		var contents string
		var timestamp string
		var search_text_string string

		type_search_text := reflect.TypeOf(search_text)

		if type_search_text.Kind() == reflect.String {
			search_text_string = search_text.(string)
		} else {
			search_text_string = FloatToString(search_text.(float64))
		}

		var like_text = "%" + search_text_string + "%"

		count := 0
		index := 0

		rows, err := db.Query("SELECT id FROM notice")

		if sort == "1"{
			rows, err = db.Query("SELECT id FROM notice ORDER BY timestamp")
		} else {
			rows, err = db.Query("SELECT id FROM notice ORDER BY timestamp DESC")
		}

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next(){
			err := rows.Scan(&id)

			if err != nil {
				log.Fatal(err)
				return
			}

			startPage := 0

			result[index] = map[string]string{}

			if currentPage == "" {
				startPage = 0
			} else {
				startPage, err = strconv.Atoi(currentPage.(string))
			}

			if count < (startPage - 1) * 20 {
				count++; 
				continue
			}

			switch{//
			case search_select == "1":
				err = db.QueryRow("SELECT title, contents, timestamp FROM notice WHERE id = ? && title LIKE ?", id, like_text).Scan(&title, &contents, &timestamp)
			case search_select == "2":
				err = db.QueryRow("SELECT title, contents, timestamp FROM notice WHERE id = ? && contents LIKE ?", id, like_text).Scan(&title, &contents, &timestamp)
			}

			switch{
			case err == sql.ErrNoRows:
				continue
			case err != nil:
				log.Fatal(err)
				return
			}

			result[index]["id"] = id
			result[index]["title"] = title
			result[index]["content"] = contents
			result[index]["timestamp"] = timestamp

			count++
			index++

			result[0]["total_count"] = strconv.Itoa(count)
		}

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/update_feedback", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		id := raw["id"]
		title := raw["title"]
		division := raw["division"]
		category := raw["category"]
		contents := raw["contents"]

		_, err := db.Exec("UPDATE feedback SET title=?, divison=?, category=?, contents=? WHERE id = ?", title, division, category, contents, id)

		if err != nil {
			log.Fatal(err)
			c.JSON(200, gin.H{
				"result": "false",
			})
			return
		}

		c.JSON(200, gin.H{
			"result": "true",
		})
	})

	router.POST("/search_feedback_list", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		currentPage := raw["currentPage"]
		division := raw["division"]
		category := raw["category"]
		sort := raw["sort"]
		search_text := raw["search_text"]
		search_select := raw["search_select"]

		var search_text_string string

		type_search_text := reflect.TypeOf(search_text)

		if type_search_text.Kind() == reflect.String {
			search_text_string = search_text.(string)
		} else {
			search_text_string = FloatToString(search_text.(float64))
		}

		var like_text = "%" + search_text_string + "%"

		count := 0
		index := 0

		var result map[int]map[string]string = map[int]map[string]string{}
		var id string
		var feedback Feedback

		rows, err := db.Query("SELECT id FROM feedback")

		if division == "" && category=="" {
			if sort == "1" {
				rows, err = db.Query("SELECT id FROM feedback ORDER BY timestamp")
			} else {
				rows, err = db.Query("SELECT id FROM feedback ORDER BY timestamp DESC")
			}
		} else if division=="" && category!="" {
			if sort == "1" {
				rows, err = db.Query("SELECT id FROM feedback WHERE category=? ORDER BY timestamp", category)
			}else{
				rows, err = db.Query("SELECT id FROM feedback WHERE category=? ORDER BY timestamp DESC", category)
			}
		} else if division!="" && category=="" {
			if sort == "1"{
				rows, err = db.Query("SELECT id FROM feedback WHERE divison=? ORDER BY timestamp", division)
			} else {
				rows, err = db.Query("SELECT id FROM feedback WHERE divison=? ORDER BY timestamp DESC", division)
			}
		} else if division!="" && category!="" {
			if sort == "1"{
				rows, err = db.Query("SELECT id FROM feedback WHERE divison=? && category=? ORDER BY timestamp", division, category)
			} else {
				rows, err = db.Query("SELECT id FROM feedback WHERE divison=? && category=? ORDER BY timestamp DESC", division, category)
			}
		}

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next() {
			err := rows.Scan(&id)

			if err != nil {
				log.Fatal(err)
				return;
			}

			startPage := 0

			result[index] = map[string]string{}

			if currentPage == "" {
				startPage = 0
			} else {
				startPage, err = strconv.Atoi(currentPage.(string))
			}

			if count < (startPage - 1) * 5{
				count++
				continue
			}

			switch{
			case search_select == "1":
				err = db.QueryRow("SELECT name, email, phone, divison, category, title, contents, timestamp FROM feedback WHERE id = ? && title LIKE ?", id, like_text).Scan(&feedback.name, &feedback.email, &feedback.phone, &feedback.division, &feedback.category, &feedback.title, &feedback.contents, &feedback.timestamp)				
			case search_select == "2":
				err = db.QueryRow("SELECT name, email, phone, divison, category, title, contents, timestamp FROM feedback WHERE id = ? && contents LIKE ?", id, like_text).Scan(&feedback.name, &feedback.email, &feedback.phone, &feedback.division, &feedback.category, &feedback.title, &feedback.contents, &feedback.timestamp)				
			}


			switch {
			case err == sql.ErrNoRows:
				log.Println("Not Found Rows")
				continue
			case err != nil:
				log.Fatal(err)
				return
			}

			result[index]["id"] = id
			result[index]["name"] = feedback.name
			result[index]["phone"] = feedback.phone
			result[index]["division"] = feedback.division
			result[index]["category"] = feedback.category
			result[index]["title"] = feedback.title
			result[index]["contents"] = feedback.contents
			result[index]["timestamp"] = feedback.timestamp

			count++
			index++

			result[0]["total_count"] = strconv.Itoa(count)
		}

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/refundable_reservation", func(c *gin.Context) {
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		email := raw["email"].(string)
		currentPage := raw["currentPage"]

		count := 0
		index := 0
		now := time.Now().String()

		var result map[int]map[string]string = map[int]map[string]string{}
		var car_number string
		var reservation_number string
		var reservation Reservation_History

		rows, err := db.Query("SELECT car_number, number FROM  reservation WHERE email = ? && rental_date > ? ORDER BY id DESC", email, now)

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next(){
			err := rows.Scan(&car_number, &reservation_number)

			if err != nil {
				log.Fatal(err)
			}

			result[index] = map[string]string{}

			currentPage_number, err := strconv.Atoi(currentPage.(string))

			if count < (currentPage_number -1) * 5 {
				count++;
				continue;
			}	

			err = db.QueryRow("SELECT image, car_number, name, type, fuel, color, distance, few FROM car WHERE car_number = ?", car_number).Scan(&reservation.image, &reservation.car_number, &reservation.car_name, &reservation.car_type, &reservation.fuel, &reservation.color, &reservation.distance, &reservation.few)

			switch{
			case err == sql.ErrNoRows:
				continue
			case err != nil:
				log.Fatal(err)
				return
			}

			err = db.QueryRow("SELECT changed_filename FROM image where id = ?", reservation.image).Scan(&reservation.image)

			result[index]["image"] = reservation.image
			result[index]["car_number"] = reservation.car_number
			result[index]["car_name"] = reservation.car_name
			result[index]["car_type"] = reservation.car_type
			result[index]["fuel"] = reservation.fuel
			result[index]["color"] = reservation.color
			result[index]["distance"] = reservation.distance
			result[index]["few"] = reservation.few
			result[index]["reservation_number"] = reservation_number

			count++
			index++
	
			result[0]["total_page"] = strconv.Itoa(count)
		}

		c.JSON(200, gin.H { 
			"result": result,
		})
	})

	router.POST("/search_refundable_reservation", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		email := raw["email"].(string)
		currentPage := raw["currentPage"]
		search_select := raw["search_select"]
		search_text := raw["search_text"]

		var search_text_string string

		log.Println("search_text type of = ", reflect.TypeOf(search_text))

		type_search_text := reflect.TypeOf(search_text)

		if type_search_text.Kind() == reflect.String {
			search_text_string = search_text.(string)
		} else {
			search_text_string = FloatToString(search_text.(float64))
		}

		var like_text = "%" + search_text_string + "%"

		count :=0
		index := 0
		now := time.Now().String()

		var result map[int]map[string]string = map[int]map[string]string{}
		var car_number string
		var reservation_number string
		var reservation Reservation_History

		rows, err := db.Query("SELECT car_number, number FROM reservation WHERE email = ? && rental_date > ? && number LIKE ? ORDER BY id DESC", email, now, like_text)

		switch{
		case search_select == "1":
			rows, err = db.Query("SELECT car_number, number FROM reservation WHERE email = ? && rental_date > ? && number LIKE ? ORDER BY id DESC", email, now, like_text)
		case search_select == "2":
			rows, err = db.Query("SELECT car_number, number FROM reservation WHERE email = ? && rental_date > ? && car_number LIKE ? ORDER BY id DESC", email, now, like_text)
		}

		
		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next(){
			err := rows.Scan(&car_number, &reservation_number)

			if err != nil {
				log.Fatal(err)
			}

			result[index] = map[string]string{}

			currentPage_number, err := strconv.Atoi(currentPage.(string))

			if count < (currentPage_number -1) * 5 {
				count++;
				continue;
			}	

			err = db.QueryRow("SELECT image, car_number, name, type, fuel, color, distance, few FROM car WHERE car_number = ?", car_number).Scan(&reservation.image, &reservation.car_number, &reservation.car_name, &reservation.car_type, &reservation.fuel, &reservation.color, &reservation.distance, &reservation.few)

			switch{
			case err == sql.ErrNoRows:
				continue
			case err != nil:
				log.Fatal(err)
				return
			}

			err = db.QueryRow("SELECT changed_filename FROM image where id = ?", reservation.image).Scan(&reservation.image)

			result[index]["image"] = reservation.image
			result[index]["car_number"] = reservation.car_number
			result[index]["car_name"] = reservation.car_name
			result[index]["car_type"] = reservation.car_type
			result[index]["fuel"] = reservation.fuel
			result[index]["color"] = reservation.color
			result[index]["distance"] = reservation.distance
			result[index]["few"] = reservation.few
			result[index]["reservation_number"] = reservation_number

			count++
			index++
	
			result[0]["total_page"] = strconv.Itoa(count)
		}

		c.JSON(200, gin.H { 
			"result": result,
		})
	})

	router.POST("/search_reservation_history", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		email := raw["email"].(string)
		currentPage := raw["currentPage"]
		search_select := raw["search_select"]
		search_text := raw["search_text"]

		var search_text_string string

		log.Println("search_text type of = ", reflect.TypeOf(search_text))

		type_search_text := reflect.TypeOf(search_text)

		if type_search_text.Kind() == reflect.String {
			search_text_string = search_text.(string)
		} else {
			search_text_string = FloatToString(search_text.(float64))
		}

		var like_text = "%" + search_text_string + "%"

		count :=0
		index := 0
		now := time.Now().String()

		var result map[int]map[string]string = map[int]map[string]string{}
		var car_number string
		var rental_date string
		var reservation_number string
		var reservation Reservation_History

		rows, err := db.Query("SELECT car_number, rental_date, number FROM reservation where email = ? && number LIKE ? ORDER BY id DESC", email, like_text)

		switch{
		case search_select == "1":
			rows, err = db.Query("SELECT car_number, rental_date, number FROM reservation where email = ? && number LIKE ? ORDER BY id DESC", email, like_text)
		case search_select == "2":
			rows, err = db.Query("SELECT car_number, rental_date, number FROM reservation where email = ? && car_number LIKE ? ORDER BY id DESC", email, like_text)
		}

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()
	
		for rows.Next(){
			err := rows.Scan(&car_number, &rental_date, &reservation_number)
	
			if err != nil{
				log.Fatal(err)
			}
	
			result[index] = map[string]string{}
	
			if err != nil {
				log.Fatal(err)
			}
	
			currentPage_number, err := strconv.Atoi(currentPage.(string))
	
			if count < (currentPage_number -1) * 5 {
				count++;
				continue;
			}
	
			err = db.QueryRow("SELECT image, car_number, name, type, fuel, color, distance, few FROM car WHERE car_number = ?", car_number).Scan(&reservation.image, &reservation.car_number, &reservation.car_name, &reservation.car_type, &reservation.fuel, &reservation.color, &reservation.distance, &reservation.few)
		
			switch{
			case err == sql.ErrNoRows:
				log.Println("LOG:: No Rows")
				continue;
			case err != nil:
				log.Println(err)
			}
	
			err = db.QueryRow("SELECT changed_filename FROM image where id = ?", reservation.image).Scan(&reservation.image)
	
			result[index]["image"] = reservation.image
			result[index]["car_number"] = reservation.car_number
			result[index]["car_name"] = reservation.car_name
			result[index]["car_type"] = reservation.car_type
			result[index]["fuel"] = reservation.fuel
			result[index]["color"] = reservation.color
			result[index]["distance"] = reservation.distance
			result[index]["few"] = reservation.few
			result[index]["reservation_number"] = reservation_number
	
			if rental_date <= now {
				result[index]["refundable"] = "false"
			} else {
				result[index]["refundable"] = "true"
			}
	
			count++
			index++
	
			result[0]["total_page"] = strconv.Itoa(count)
		}
	
		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/total_reservation_list", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		currentPage := raw["currentPage"]

		count := 0
		index := 0

		var result map[int]map[string]string = map[int]map[string]string{}
		var reservation Total_reservation

		rows,  err := db.Query("SELECT email, car_number, cost, number, rental_date, return_date, rental_point, return_point, seat, navigation_korean, navigation_english, damage_indemnity FROM reservation ORDER BY id DESC")

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next(){
			err := rows.Scan(&reservation.email, &reservation.car_number, &reservation.cost, &reservation.number, &reservation.rental_date, &reservation.return_date, &reservation.rental_point, &reservation.return_point, &reservation.babyseat, &reservation.navigation_kor, &reservation.navigation_eng, &reservation.damage_indemnity)

			if err != nil{
				log.Fatal(err)
				return
			}

			if index < 5 {

				result[index] = map[string]string{}

				if err != nil {
					log.Fatal(err)
				}

				currentPage_number, err := strconv.Atoi(currentPage.(string))

				if count < (currentPage_number - 1) * 5 {
					count++
					continue
				}

				err = db.QueryRow("SELECT image, name, color FROM car WHERE car_number = ?", reservation.car_number).Scan(&reservation.image, &reservation.car_name, &reservation.color)

				switch{
				case err == sql.ErrNoRows:
					continue
				case err != nil:
					log.Fatal(err)
					return
				}

				err = db.QueryRow("SELECT name, username FROM users WHERE email = ?", reservation.email).Scan(&reservation.name, &reservation.username)

				switch{
				case err == sql.ErrNoRows:
					continue
				case err != nil:
					log.Fatal(err)
					return
				}

				err = db.QueryRow("SELECT changed_filename FROM image WHERE id = ?", reservation.image).Scan(&reservation.image)

				switch{
				case err == sql.ErrNoRows:
					continue
				case err != nil:
					log.Fatal(err)
					return
				}

				result[index]["name"] = reservation.name
				result[index]["email"] = reservation.email
				result[index]["username"] = reservation.username
				result[index]["number"] = reservation.number
				result[index]["image"] = reservation.image
				result[index]["car_number"] = reservation.car_number
				result[index]["car_name"] = reservation.car_name
				result[index]["color"] = reservation.color
				result[index]["cost"] = reservation.cost
				result[index]["rental_date"] = reservation.rental_date
				result[index]["return_date"] = reservation.return_date
				result[index]["rental_point"] = reservation.rental_point
				result[index]["return_point"] = reservation.return_point
				result[index]["babyseat"] = reservation.babyseat
				result[index]["navigation_kor"] = reservation.navigation_kor
				result[index]["navigation_eng"] = reservation.navigation_eng
				result[index]["damage_indemnity"] = reservation.damage_indemnity

				index++
			}
			count++
			result[0]["total_page"] = strconv.Itoa(count)
		}

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/search_total_reservation_list", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		currentPage := raw["currentPage"]
		search_select := raw["search_select"]
		search_text := raw["search_text"]

		log.Println("raw = > ", raw)

		var search_text_string string

		log.Println("search_text type of = ", reflect.TypeOf(search_text))

		type_search_text := reflect.TypeOf(search_text)

		if type_search_text.Kind() == reflect.String {
			search_text_string = search_text.(string)
		} else {
			search_text_string = FloatToString(search_text.(float64))
		}

		var like_text = "%" + search_text_string + "%"

		count := 0
		index := 0

		var result map[int]map[string]string = map[int]map[string]string{}
		var reservation Total_reservation

		rows,  err := db.Query("SELECT email, car_number, cost, number, rental_date, return_date, rental_point, return_point, seat, navigation_korean, navigation_english, damage_indemnity FROM reservation ORDER BY id DESC")

		switch{
		case search_select == "1":
			rows, err = db.Query("SELECT email, car_number, cost, number, rental_date, return_date, rental_point, return_point, seat, navigation_korean, navigation_english, damage_indemnity FROM reservation WHERE number LIKE ? ORDER BY id DESC", like_text)
		case search_select == "2":
			rows, err = db.Query("SELECT email, car_number, cost, number, rental_date, return_date, rental_point, return_point, seat, navigation_korean, navigation_english, damage_indemnity FROM reservation WHERE car_number LIKE ? ORDER BY id DESC", like_text)			
		}

		if err != nil {
			log.Fatal(err)
		}
		defer rows.Close()

		for rows.Next(){
			err := rows.Scan(&reservation.email, &reservation.car_number, &reservation.cost, &reservation.number, &reservation.rental_date, &reservation.return_date, &reservation.rental_point, &reservation.return_point, &reservation.babyseat, &reservation.navigation_kor, &reservation.navigation_eng, &reservation.damage_indemnity)

			if err != nil{
				log.Fatal(err)
				return
			}

			result[index] = map[string]string{}

			if err != nil {
				log.Fatal(err)
			}

			result[index] = map[string]string{}

			currentPage_number, err := strconv.Atoi(currentPage.(string))

			if count < (currentPage_number - 1) * 5 {
				count++
				continue
			}

			err = db.QueryRow("SELECT image, name, color FROM car WHERE car_number = ?", reservation.car_number).Scan(&reservation.image, &reservation.car_name, &reservation.color)

			switch{
			case err == sql.ErrNoRows:
				continue
			case err != nil:
				log.Fatal(err)
				return
			}

			err = db.QueryRow("SELECT name, username FROM users WHERE email = ?", reservation.email).Scan(&reservation.name, &reservation.username)

			switch{
			case search_select == "3":
				err = db.QueryRow("SELECT name, username FROM users WHERE email = ? && name LIKE ?", reservation.email, like_text).Scan(&reservation.name, &reservation.username)
			case search_select == "4":
				err = db.QueryRow("SELECT name, username FROM users WHERE email = ? && email LIKE ?", reservation.email, like_text).Scan(&reservation.name, &reservation.username)
			}

			switch{
			case err == sql.ErrNoRows:
				continue
			case err != nil:
				log.Fatal(err)
				return
			}

			err = db.QueryRow("SELECT changed_filename FROM image WHERE id = ?", reservation.image).Scan(&reservation.image)

			switch{
			case err == sql.ErrNoRows:
				continue
			case err != nil:
				log.Fatal(err)
				return
			}

			result[index]["name"] = reservation.name
			result[index]["email"] = reservation.email
			result[index]["username"] = reservation.username
			result[index]["number"] = reservation.number
			result[index]["image"] = reservation.image
			result[index]["car_number"] = reservation.car_number
			result[index]["car_name"] = reservation.car_name
			result[index]["color"] = reservation.color
			result[index]["cost"] = reservation.cost
			result[index]["rental_date"] = reservation.rental_date
			result[index]["return_date"] = reservation.return_date
			result[index]["rental_point"] = reservation.rental_point
			result[index]["return_point"] = reservation.return_point
			result[index]["babyseat"] = reservation.babyseat
			result[index]["navigation_kor"] = reservation.navigation_kor
			result[index]["navigation_eng"] = reservation.navigation_eng
			result[index]["damage_indemnity"] = reservation.damage_indemnity

			count++
			index++

			result[0]["total_page"] = strconv.Itoa(count)
		}

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/feedback_list_comments", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		currentPage := raw["currentPage"]
		id := raw["id"]

		log.Println("raw => ", raw)

		count := 0
		index := 0

		var id2 string

		var admin string
		var contents string
		var timestamp string

		var result map[int]map[string]string = map[int]map[string]string{}

		rows, err := db.Query("SELECT id FROM feedback_comment WHERE feedback_id = ? ORDER BY timestamp DESC", id)

		if err != nil{
			log.Fatal(err)
			return
		}
		defer rows.Close()

		for rows.Next(){
			err := rows.Scan(&id2)

			if err != nil {
				log.Fatal(err)
				return
			}

			startPage := 0

			result[index] = map[string]string{}

			if currentPage == "" {
				startPage = 0
			} else {
				startPage, err = strconv.Atoi(currentPage.(string))
			}

			if count < (startPage - 1) * 5{
				count++
				continue
			}

			err = db.QueryRow("SELECT admin, contents, timestamp FROM feedback_comment WHERE id = ?", id2).Scan(&admin, &contents, &timestamp)

			switch{
			case err == sql.ErrNoRows:
				continue
			case err != nil:
				log.Fatal(err)
				return
			}

			result[index]["admin"] = admin
			result[index]["comment"] = contents
			result[index]["timestamp"] = timestamp

			count++
			index++

			result[0]["total_count"] = strconv.Itoa(count)
		}

		c.JSON(200, gin.H{
			"result": result,
		})
	})

	router.POST("/admin_input_comment", func(c *gin.Context){
		form := c.PostForm("form")

		var raw map[string]interface{}
		json.Unmarshal([]byte(form), &raw)

		id := raw["id"]
		comment := raw["comment"]

		_, err := db.Exec("INSERT INTO feedback_comment (admin, feedback_id, contents) VALUES (?, ?, ?)", 1, id, comment)

		if err != nil {
			log.Fatal(err)
			return
		}

		c.JSON(200, gin.H{
			"result": "true",
		})
	})



	m.HandleMessage(func(s *melody.Session, message []byte) {
		
	})

	router.Static("/public", "./public")
	router.Run(":5000")
}
