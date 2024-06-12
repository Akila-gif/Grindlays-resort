package com.grindlaysresort;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import java.io.IOException;

@SpringBootApplication
@RestController
public class GrindlaysresortApplication {

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
			response.setHeader("Access-Control-Max-Age", "3600");
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

	@RequestMapping(value = "/errorpage")
	public ModelAndView displayError(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView empView = new ModelAndView();
		empView.setViewName("error.html");
		return empView;
	}

	@RequestMapping(value = "/index")
	public ModelAndView displayDashboard(){
		//return "<h1>miyew miyew miyew miyew</h1>";
		ModelAndView dashboardView = new ModelAndView();
		dashboardView.setViewName("dashboard.html");
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

/*	@RequestMapping(value = "/createadmin")
	public void DisplayEmployee(){
		User adminUser = new User();
		adminUser.setUsername("admin");
		adminUser.setPassword(bCryptPasswordEncoder.encode("1234"));
		adminUser.setStatus(true);
		adminUser.setAddeddate(LocalDateTime.now());
		adminUser.setEmployee_id(employeeDao.getReferenceById(1));

		List<Role> roles = new ArrayList<>();
		roles.add(roleDao.getReferenceById(1));
		adminUser.setRoleList(roles);
		userDao.save(adminUser);
	}*/

}
