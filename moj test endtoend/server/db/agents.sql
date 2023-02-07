DROP TABLE IF EXISTS agents;
CREATE TABLE  agents (	
    agent_code VARCHAR(6) NOT NULL PRIMARY KEY, 
	name VARCHAR(40), 
	area VARCHAR(35), 
	commission NUMERIC(10,2), 
	phone VARCHAR(15)
	 
	 )
