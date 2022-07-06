Rails.application.routes.draw do
  resources :users, only: %i[show create update]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get "/me", to: "users#show"
  post "/signup", to: "users#create"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  post "/user-image", to: "users#add_images"

  # ^^^ Define all API routes above ^^^

  # direct all non-backend routes to index.html
  get "*path",
      to: "fallback#index",
      constraints: ->(req) { !req.xhr? && req.format.html? && req.path.exclude?('rails/active_storage')}
end
