select opt.id, p.name, p.price + opt.price_increase as price, opt.product_color, img.`path`, img.main_image, p.slug, opt.color_slug  
 from product_options opt  
 left join product p  
 on p.id = opt.product_id  
 left join product_options_image img  
 on opt.id = img.option_id  
 where img.main_image = "1" and p.id in  
	 (select p.id  
	 from product p, product_category pc, products_to_categories ptc  
	 where pc.id = ptc.category_id  
	 and ptc.product_id = p.id  
	 and pc.name = "ÁÐÞÊÈ")  
 order by opt.`order`
 
 
 select *
 from product_options opt  
 left join product p  
 on p.id = opt.product_id  
 left join product_options_image img  
 on opt.id = img.option_id  
 where img.main_image = "1" and p.id in  
	 (select p.id  
	 from product p, product_category pc, products_to_categories ptc  
	 where pc.id = ptc.category_id  
	 and ptc.product_id = p.id  
	 and pc.name = "Áðþêè")  
 order by opt.`order`
 
 
select opt.id, p.name, p.price + opt.price_increase as price, opt.product_color, img.`path`, img.main_image, p.slug, opt.color_slug 
from product_options opt  
left join product p  
on p.id = opt.product_id  
left join product_options_image img  
on opt.id = img.option_id  
where img.main_image = "1" and p.id in  
    (select p.id  
	 from product p, product_category pc, products_to_categories ptc  
	 where pc.id = ptc.category_id  
	 and ptc.product_id = p.id  
	 and pc.name = "Áðþêè")  
order by opt.`order`


select opt.id, p.name, p.price + opt.price_increase as price, opt.product_color, img.`path`, img.main_image, p.slug, opt.color_slug 
from product_options opt
  left join product p
  on p.id = opt.product_id
  left join product_options_image img
  on opt.id = img.option_id
  where img.main_image = "1" and p.id in
      (select p.id
    from product p, product_category pc, products_to_categories ptc
    where pc.id = ptc.category_id
    and ptc.product_id = p.id
    and pc.name = "Áðþêè") order by opt.`order`
    
    
select po.product_id, po.id as option_id, p.name, p.price + po.price_increase as price, po.product_color, po.description, p.sizetable_path, po.color_slug 
from product_options po 
left join product p 
on po.product_id = p.id 
where po.color_slug = "black" and p.slug = "leather"

select poi.id as image_id, poi.`path`, poi.main_image 
from product_options po 
left join product_options_image poi 
 on poi.option_id = po.id 
left join product p 
on p.id = po.product_id 
where po.color_slug = "black" and p.slug = "leather"


select * from slider ORDER BY slide_order
 