---
layout: post
title:  "How to avoid Deployment Crisis"
date:   2017-05-14 12:08:43 +0300
categories: design
comments: true
image-folder: 2017-05-14-avoid-deployment-crisis
featured-image: design.jpg
excerpt: Let’s say we are in the middle of a project about adding a new water supply line to a house.
---

***

![design]({{ site.image-path }}/{{ page.image-folder }}/design.jpg){:class="img-responsive"}

***

Let’s say we are in the middle of a project about adding a new water supply line to a house. For this project there two groups working, one installing the new pipes outside, and the other one adding a new facet inside the house. The project will be considered a success when the user opens the facet and clear fresh water flows from it. The project’s management team has decided that the two groups will be working in parallel and that all parts' deployment will take place at the same time.

***

### What if the deployment fails?

Imagine you are part of the ‘inside’ team (the one adding the facet inside the house) working on the design of the project within your scope. The project manager approaches you and demands that you have fallback actions available, in case the deployment of the other team fails and the management team decides to fallback with the project’s deployment. As a manager, you wouldn’t want your client to open the facet and see mud coming from it, would you?

What would you do then to handle this crisis scenario? The *backup* option is not available in this case. Obviously removing every change done and restoring everything in their initial state would be cost- and time-consuming, probably leading the team working overtimes late at night. A simple and efficient solution would be of course to add a valve inside the house where you can turn off the new water supply, depending on the status of the ‘outside’ parts of the project, while leaving all the ‘inside’ parts ready to use after successfully deploying them.

***

### From Plumber to Software Engineer…

Now let’s leave the plumbing systems to the plumbers and apply this case on an IT project. Again we have two separate delivery units working on a new functionality that needs to be added in the existing processes. To simplify things, your team handles the ‘inside’ systems, with which the users are working and the ‘outside’ team is responsible for the web services that draw data from the internet and provide them to the 'inside' part.

#### Requirements

- The process must work seamlessly and cannot be interrupted by system errors. System errors are not tolerated, as they lead to financial loss to the company itself.
- If anything goes wrong during the deployment, then the user’s work should not be affected in any case while using the existing process. It should be like the new functionality was never added.

#### Drawbacks

- The deployment time window is very small and clearly not enough to handle rollback actions.
- Having people working overtimes to rollback changes is to be avoided for many reasons (e.g. costs).
- There is no system configuration options available to support you. There is only your code and database tables.

To find out if the ‘valve’ option works for this case we must dive deeper into the design of the process and ask the following question:
*How the new functionality is introduced to the existing process?*

***

### The integration point

In the following diagram we have pinpointed the spot (A) where the new functionality is to be added.

![diagram 2]({{ site.image-path }}/{{ page.image-folder }}/diag-2.jpg){:class="img-responsive"}

The necessary implementations include modifying an existing main program by introducing a new piece of code. The quick and dirty way would be to go with injecting the new code inside the existing program.

What I would consider as a better practice, is to use a more modular approach like the following.

![diagram 3]({{ site.image-path }}/{{ page.image-folder }}/diag-3.jpg){:class="img-responsive"}

In this case we add all the new functionality outside of the existing program in a separate module (another program or function module) adding in the existing program only the necessary call to this module. The spot that needs to be changed in the existing program in order to call our new functionality would be the **integration point**.

***

#### Decision Making

Now that it is clear what the integration point is, it’s time to add a *valve*, meaning an on-off switch for the new functionality.

We will define this switch in very simple way using a configuration table like the following:

{:.table .table-bordered}
| Process ID 	| Process Name            	| Active 	|
|------------	|-------------------------	|--------	|
| 01         	| New Process Description 	| X      	|

Obviously the *Active* column of the configuration table defines whether the new functionality is to be executed or not.

With the configuration ready, we need to decide where to add the query to the configuration table.

One way would be to add the query inside the main program like so.

![diagram 4]({{ site.image-path }}/{{ page.image-folder }}/diag-4.jpg){:class="img-responsive"}

With this approach we let the program do the decision making whether to call the new mechanism or not. This would suit a scenario where we would have multiple programs that need to call the new mechanism but only some of them would need to be affected by the configuration.

In order to make the configuration affect the execution of the new mechanism globally, we would need to add the decision making inside the new module.

![diagram 5]({{ site.image-path }}/{{ page.image-folder }}/diag-5.jpg){:class="img-responsive"}

Based on this design, the existing program is only able to call the new mechanism, and handle the return of results. If we proceed with this approach, we need to make the implementations in such a way where when the new process is found inactive, the existing program will continue its flow like normal.

***

### Turn off the switch in case of an emergency!

To sum up, we defined a killer on-off switch for our new process. In the crisis scenario when the deployment of the other team goes wrong and the management decides to fallback, all we have to do is change the configuration table and deactivate the new process; just like using a valve under our sink in the bathroom!

***
