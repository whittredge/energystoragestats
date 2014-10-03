Rails.application.routes.draw do
  root					'static_pages#home'
  get 'help'		=>	'static_pages#help'
  get 'about'		=>	'static_pages#about'
  get 'examples'	=>	'static_pages#examples'
end