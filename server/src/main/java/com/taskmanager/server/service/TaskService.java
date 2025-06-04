import com.taskmanager.server.repository.TaskRepository;
import com.taskmanager.server.model.Task; // Also make sure you import the Task model
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository repo;

    public List<Task> getAllTasks() {
        return repo.findAll();
    }
}