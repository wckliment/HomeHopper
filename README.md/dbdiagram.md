# Homehopper DB diagram Schema in Markdown

Table Users {
  id Integer [pk, increment]
  firstName varchar
  lastName varchar
  username varchar
  hashedPassword varchar
  email varcahr
   createdAt timestamp
  updatedAt timestamp
}

Table Spots {
  id int [pk, increment]
  ownerId int [ref: > Users.id]
  address varchar
  city varchar
  state varchar
  country varchar
  lat decimal
  lng decimal
  name varchar
  description varchar
  price decimal
  createdAt timestamp
  updatedAt timestamp
}

Table Reviews {
  id int [pk, increment]
  spotId int [ref: > Spots.id]
  userId int [ref: > Users.id]
  review varchar
  stars int
  createdAt timestamp
  updatedAt timestamp
}

Table Bookings {
  id int [pk, increment]
  spotId int [ref: > Spots.id]
  userId int [ref: > Users.id]
  startDate date
  endDate date
  createdAt timestamp
  updatedAt timestamp
}

Table Spot_Images {
  id int [pk, increment]
  spotId int [ref: > Spots.id]
  url varchar
  preview boolean
  createdAt timestamp
  updatedAt timestamp
}

Table Review_Images{
  id int [pk, increment]
  reviewId int [ref: > Reviews.id]
  url varchar
  createdAt timestamp
  updatedAt timestamp
}
