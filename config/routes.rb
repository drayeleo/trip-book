Rails.application.routes.draw do
  resources :locations
  resources :trips
  resources :users, only: %i[show create update]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get "/me", to: "users#show"
  post "/signup", to: "users#create"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # post "/user-image", to: "users#add_images"

  # post "/trips/:id/add-images", to: "trips#add_images"

  post "/trips/:trip_id/add-locations", to: "trips#add_locations"

  # ^^^ Define all API routes above ^^^

  # direct all non-backend routes to index.html
  get "*path",
      to: "fallback#index",
      constraints: ->(req) {
        !req.xhr? && req.format.html? &&
          req.path.exclude?("rails/active_storage")
      }
end
