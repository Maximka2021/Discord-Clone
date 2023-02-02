# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding..."

        ChatRoom.create!(
            title: "Games",
            description: "About Games",
            rules: "Be kind"
        )
        ChatRoom.create!(
            title: "Books",
            description: "About Books",
            rules: "Be kind"
        )
        ChatRoom.create!(
            title: "Code",
            description: "About Code",
            rules: "Be kind"
        )


    10.times{
        User.create!(
            username: Faker::App.name,
            password: "123",
            email: Faker::Internet.email
        )
    }

    5.times{
        Message.create!(
            user_id: rand(1..6),
            chat_room_id: rand(1..3),
            body: "test message"
        )
    }

    10.times{
        Member.create!(
            user_id: rand(1..10),
            chat_room_id: rand(1..3)
        )
    }



puts "Done seeding!"
