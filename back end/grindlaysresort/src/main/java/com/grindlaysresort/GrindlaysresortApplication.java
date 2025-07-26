package com.grindlaysresort;

import com.grindlaysresort.employeeModule.EmployeeDao;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@RestController
public class GrindlaysresortApplication {
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private final UserDao userDao;

	@Autowired
	private RoleDao roleDao;

	public GrindlaysresortApplication(UserDao userDao) {
		this.userDao = userDao;
	}

	public static void main(String[] args) {
		SpringApplication.run(GrindlaysresortApplication.class, args);
	}
/*
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
*/

	@Autowired
	private EmployeeDao employeeDao;

	@Component
	public class MyCORSFilter implements Filter {

		@Override
		public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

			HttpServletRequest request = (HttpServletRequest) req;
			HttpServletResponse response = (HttpServletResponse) res;
			response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
			response.setHeader("Access-Control-Allow-Credentials", "true");
			response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
			response.setHeader("Access-Control-Max-Age", "*");
			response.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
			chain.doFilter(req, res);
		}


	}

	@RequestMapping(value = "/emp")
	public ModelAndView displayEmployee(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView empView = new ModelAndView();
		empView.setViewName("employee.html");
		return empView;
	}
	@RequestMapping(value = "/usersview")
	public ModelAndView displayuser(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView userView = new ModelAndView();
		userView.setViewName("user.html");
		return userView;
	}

	@RequestMapping(value = "/privilegeview")
	public ModelAndView displayprivilage(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView userView = new ModelAndView();
		userView.setViewName("privilege.html");
		return userView;
	}

	@RequestMapping(value = "/errorpage")
	public ModelAndView displayError(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView empView = new ModelAndView();
		empView.setViewName("errorpage.html");
		return empView;
	}

	@RequestMapping(value = "/index")
	public ModelAndView displayDashboard(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		ModelAndView dashboardView = new ModelAndView();
		User user = userDao.getUserByUsername(authentication.getName());
		dashboardView.addObject("logusername", authentication.getName());
		String [] nameArray = user.getEmployee_id().getFull_name().split(" ");
		dashboardView.addObject("logEmployee", nameArray[0]+" "+ nameArray[nameArray.length-1]);
		dashboardView.addObject("logEmployeeDesignation", user.getEmployee_id().getDesignation_id().getDesignation_name());
		dashboardView.addObject("logeduserid", user.getId());
		dashboardView.setViewName("index.html");
		return dashboardView;
	}
	@RequestMapping(value = "/login")
	public ModelAndView displayLogin(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView empView = new ModelAndView();
		empView.setViewName("login.html");
		return empView;
	}

	@RequestMapping(value = "/generateadmin")
	public ModelAndView generateAdmin(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView empView = new ModelAndView();
		empView.setViewName("employee.html");
		return empView;
	}

	@RequestMapping(value = "/roomview")
	public ModelAndView displayRoom(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView roomView = new ModelAndView();
		roomView.setViewName("Room.html");
		return roomView;
	}

	@RequestMapping(value = "/packageview")
	public ModelAndView displayPackage(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView roomView = new ModelAndView();
		roomView.setViewName("roompackage.html");
		return roomView;
	}

	@RequestMapping(value = "/customerview")
	public ModelAndView displayCustomer(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView roomView = new ModelAndView();
		roomView.setViewName("customer.html");
		return roomView;
	}

	@RequestMapping(value = "/serviceview")
	public ModelAndView displayService(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView serviceView = new ModelAndView();
		serviceView.setViewName("service.html");
		return serviceView;
	}

	// report section
	@RequestMapping(value = "/employeereportview")
	public ModelAndView displayEmployeeReportView(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView EmployeeReporteView = new ModelAndView();
		EmployeeReporteView.setViewName("employeereport.html");
		return EmployeeReporteView;
	}

	@RequestMapping(value = "/customerreportview")
	public ModelAndView displayCustomerReportView(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView CustommerReporteView = new ModelAndView();
		CustommerReporteView.setViewName("customerreport.html");
		return CustommerReporteView;
	}

	@RequestMapping(value = "/reservationview")
	public ModelAndView displayReservationView(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView ReservationView = new ModelAndView();
		ReservationView.setViewName("reservation.html");
		return ReservationView;
	}

	@RequestMapping(value = "/customerreportviewheatmap")
	public ModelAndView displayCustomerReportHeatmap(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView CustommerReporteViewHeatmap = new ModelAndView();
		CustommerReporteViewHeatmap.setViewName("heatmapcustomerreport.html");
		return CustommerReporteViewHeatmap;
	}

	@RequestMapping(value = "/customerreportviewcountmap")
	public ModelAndView displayCustomerReportCountmap(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView CustommerReporteViewCountmap = new ModelAndView();
		CustommerReporteViewCountmap.setViewName("countmapcustomerreport.html");
		return CustommerReporteViewCountmap;
	}

	@RequestMapping(value = "/createadmin")
	public void DisplayEmployee(){
		User adminUser = new User();
		adminUser.setUsername("Akila");
		adminUser.setPassword(bCryptPasswordEncoder.encode("12345"));
		adminUser.setStatus(true);
		adminUser.setAddeddate(LocalDateTime.now());
		adminUser.setEmployee_id(employeeDao.getReferenceById(2));

		List<Role> roles = new ArrayList<>();
		roles.add(roleDao.getReferenceById(1));
		adminUser.setRoleList(roles);
		userDao.save(adminUser);
	}

	@RequestMapping(value = "/createmenuview")
	public ModelAndView DisplayMealAdded(){
		ModelAndView mealView = new ModelAndView();
		mealView.setViewName("addmenu.html");
		return mealView;
	}

	@RequestMapping(value = "/createmenuitemview")
	public ModelAndView DisplayMealItemAdded(){
		ModelAndView mealView = new ModelAndView();
		mealView.setViewName("addmenuitem.html");
		return mealView;
	}

	@RequestMapping(value = "/createingredientsview")
	public ModelAndView DisplayIngredientsAdded(){
		ModelAndView mealView = new ModelAndView();
		mealView.setViewName("addingredients.html");
		return mealView;
	}

	@RequestMapping(value = "/mealbuyingview")
	public ModelAndView DisplayReservationMealBuy(){
		ModelAndView mealView = new ModelAndView();
		mealView.setViewName("ReservationMealBuy.html");
		return mealView;
	}

	@RequestMapping(value = "/paymentmanagementview")
	public ModelAndView DisplayPaymentManagement(){
		ModelAndView mealView = new ModelAndView();
		mealView.setViewName("paymentManagement.html");
		return mealView;
	}

	@RequestMapping(value = "/landingpageview")
	public ModelAndView DisplayLandingPage(){
		ModelAndView mealView = new ModelAndView();
		mealView.setViewName("landingpage.html");
		return mealView;
	}

}
