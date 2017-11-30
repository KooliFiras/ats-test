<?php

namespace ProductBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations;
use Doctrine\ORM\EntityManagerInterface;
use ProductBundle\Entity\Product;


class DefaultController  extends FOSRestController
{

    /**
     * Displays the authenticated participant inbox.
     * @Annotations\Get("/saveProducts")
     */
    public function getSaveProductAction()
    {

     $url = 'http://internal.ats-digital.com:3066/api/products';

     $ch = curl_init();

//Set the URL that you want to GET by using the CURLOPT_URL option.
    curl_setopt($ch, CURLOPT_URL, 'http://internal.ats-digital.com:3066/api/products');

//Set CURLOPT_RETURNTRANSFER so that the content is returned as a variable.
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

//Set CURLOPT_FOLLOWLOCATION to true to follow redirects.
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

//Execute the request.
    $data = curl_exec($ch);

//Close the cURL handle.
    curl_close($ch);

//convert the data into json .
    $data= json_decode($data,true);

    $em = $this->getDoctrine()->getManager();

    foreach ($data as $obj) {
            $product= new Product();
            $product->setProductName($obj['productName']);
            $product->setBasePrice($obj['basePrice']);
            $product->setCategory($obj['category']);
            $product->setBrand($obj['brand']);
            $product->setProductMaterial($obj['productMaterial']);
            $product->setImageUrl($obj['imageUrl']);
            $product->setDelivery($obj['delivery']);
            $product->setDetails($obj['details']);
            $product->setReviews($obj['reviews']);
            $em->persist($product);
            $em->flush();
    }

    }

    /**
     * Displays the authenticated participant inbox.
     * @Annotations\Get("/products")
     */
    public function getAllAction(){
        $repository = $this->getDoctrine()->getRepository(Product::class);
        $products= $repository->findAll();
        return $products;
    }

}
