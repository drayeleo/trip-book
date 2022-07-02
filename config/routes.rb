Rails.application.routes.draw do
  resources :users, only: %i[show create update]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  # route to test your configuration
  get "/hello", to: "application#hello_world"

  # ^^^ Define all API routes above ^^^

  # direct all non-backend routes to index.html
  get "*path",
      to: "fallback#index",
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
