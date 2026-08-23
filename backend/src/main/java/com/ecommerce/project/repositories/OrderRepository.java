package com.ecommerce.project.repositories;


import com.ecommerce.project.model.Order;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.OrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,Long> {
    @Query("SELECT COALESCE(SUM(o.totalPrice),0)FROM Order o")
    Double getTotalRevenue();

    Page<Order> findByUser(User user, Pageable pageDetails);


//    List<Order> findByUser(User user);
}
