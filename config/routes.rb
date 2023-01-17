Rails.application.routes.draw do
  mount ActionCable.server => "/cable"
  resources :members
  resources :chat_rooms
  resources :messages
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  get '/me', to: "users#me"
  # get '/chats', to: "chat_rooms#chats"
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  # post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  post "/auth/login", to: "auth#login"
  post "/join", to: "members#create"
  delete "/logout", to: "sessions#destroy"
end
