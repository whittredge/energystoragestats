Rails.application.routes.draw do
  root					'static_pages#home'
  get 'help'		=>	'static_pages#help'
  get 'about'		=>	'static_pages#about'
  get 'examples'	=>	'static_pages#examples'
  get 'submit'		=>	'static_pages#submit'
  match '/submit_data', to: 'submit#submit_data', via: 'post'
end