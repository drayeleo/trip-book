class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :image_urls
end
