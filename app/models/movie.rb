class Movie < ActiveRecord::Base

   validates :name, presence: true
  validates :realese, presence: true
  validates :actor, presence: true
  validates :director, presence: true



end
