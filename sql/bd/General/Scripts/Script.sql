select *
from (select opt.id, p.name, p.price,opt.product_color 
from visokomerie.product p 
left join visokomerie.product_options opt
on p.id = opt.product_id 
where p.id!="5") opt


select opt.id, p.name, p.price + opt.price_increase as price, opt.product_color, img.`path`, img.main_image, p.slug, opt.color_slug  
  from visokomerie.product_options opt  
  left join visokomerie.product p  
  on p.id = opt.product_id  
  left join visokomerie.product_options_image img  
  on opt.id = img.option_id  
  where img.main_image = "1" and p.id in  
      (select p.id  
      from product p, product_category pc, products_to_categories ptc  
      where pc.id = ptc.category_id  
      and ptc.product_id = p.id  
      and pc.name = "¡–ﬁ »")  
  order by opt.`order`


select *
from visokomerie.slider s 
where s.IsVideo = 0

select pc.id, pc.name, pc.description 
from visokomerie.product_category pc 

select ptc.category_id, po.id as product_id, p.name, po.product_color, p.price + po.price_increase as price, poi.`path` 
from visokomerie.product p 
left join visokomerie.products_to_categories ptc 
on ptc.product_id = p.id 
left join visokomerie.product_options po 
on po.product_id = p.id 
left join visokomerie.product_options_image poi 
on poi.option_id = po.id 
where po.price_increase is not null and poi.main_image = "1"

select po.product_id, po.id as option_id, p.name, p.price + po.price_increase as price, po.product_color, po.description, p.sizetable_path  
from visokomerie.product_options po 
left join visokomerie.product p 
on po.product_id = p.id 
where po.product_color = "BLACK" and p.slug = "leather"

select poi.id as image_id, poi.`path`, poi.main_image 
from visokomerie.product_options po 
left join visokomerie.product_options_image poi 
on poi.option_id = po.id 
left join visokomerie.product p 
on p.id = po.product_id 
where po.product_color = "BLACK" and p.slug = "leather"

select po.id, p.name, po.product_color, p.price + po.price_increase as price, poi.`path` 
from visokomerie.product p 
left join visokomerie.product_options po 
on po.product_id = p.id 
left join visokomerie.product_options_image poi 
on poi.option_id = po.id 
where po.price_increase is not null and poi.main_image = "1" and po.id = '1'

select po.id, p.name, po.product_color, p.price + po.price_increase as price, poi.`path` 
from visokomerie.product p 
left join visokomerie.product_options po 
on po.product_id = p.id 
left join visokomerie.product_options_image poi 
on poi.option_id = po.id 
where po.price_increase is not null and poi.main_image = "1" and po.id ="1"

