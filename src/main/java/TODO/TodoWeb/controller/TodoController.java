package TODO.TodoWeb.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TodoController {

    @GetMapping("todo/add")
    public String createTodo(){
        return "home";
    }
}
