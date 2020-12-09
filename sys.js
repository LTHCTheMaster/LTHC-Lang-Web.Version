function num_var (var_name, val_ue) {
    this.varname = var_name;
    this.value = val_ue;
}

//Executer code
function execute_code() {
    //Création des variables requises
    var source = document.getElementById("code_area");
    var output = document.getElementById("out_area").contentWindow.document;
    var button_run = document.getElementById("run_code");
    var out = '';
    var numeric_vars = new Array();
    numeric_vars.push(new num_var("default_var_name", 0.0));
    var check = 0;

    //Détection du clic
    button_run.onclick = function() {
        //Assembler les lignes dans des listes pour pouvoir les lires
        var lines_ = source.value.split('\n');
        var transfers = '';
        for(var indexes = 0; indexes < lines_.length; indexes++) {
            transfers = transfers + lines_[indexes];
        }
        var lines = transfers.split(';');

        //Lecture des lignes
        if(lines.length >= 1) {
            for(var index = 0; index < lines.length; index++) {
                //Découpe de la ligne
                var line = lines[index].split(' ');

                //Vérification de l'existence de la ligne
                if(line.length >= 1){
                    //INSTRUCTIONS : PARSING
                    //print
                    if(line[0] == 'print') {
                        if(line.length > 1) {
                            out = out + "<p>";
                            for(var index_in = 1; index_in < line.length; index_in++) {
                                out = out + line[index_in] +' ';
                            }
                            out = out + "</p>";
                        }
                    }
                    //var   :: création de variable numérique
                    if(line[0] == 'var') {
                        //vérification de la taille de la ligne
                        if(line.length >= 3) {
                            //bouclage du tableau
                            for(var in_numvars = 0; in_numvars < numeric_vars.length; in_numvars++) {
                                if(numeric_vars[in_numvars].varname == line[1]) {
                                    check = 1;
                                }
                            }
                            if(check == 0) {
                                numeric_vars.push(new num_var(line[1],parseFloat(line[2])));
                            }
                            check = 0; 
                        }
                    }
                    //printv   :: affiche le contenu d'une variable numérique existante
                    if(line[0] == 'printv') {
                        //vérification de la taille de la ligne
                        if(line.length >= 2) {
                            //verif taille tableau de variables numériques
                            if(numeric_vars.length >= 1) {
                                for(var in_numvars = 0; in_numvars < numeric_vars.length; in_numvars++) {
                                    if(numeric_vars[in_numvars].varname == line[1]) {
                                        out += "<p>" + numeric_vars[in_numvars].value + "</p>";
                                    }
                                }
                            }
                        }
                    }
                    //setv   :: changer le contenu d'une variable numérique existante
                    if(line[0] == 'setv') {
                        //Vérification de la taille de la ligne
                        if(line.length >= 3) {
                            //Verif taille tableau num var
                            if(numeric_vars.length >= 1) {
                                for(var in_numvars = 0; in_numvars < numeric_vars.length; in_numvars++) {
                                    if(numeric_vars[in_numvars].varname == line[1]) {
                                        numeric_vars[in_numvars].value = line[2];
                                    }
                                }
                            }
                        }
                    }
                    //inputv   :: entrer une valeur dans une variable numérique existante
                    if(line[0] == 'inputv') {
                        //verif taille ligne
                        if(line.length >= 2) {
                            //verif taille tab num var
                            if(numeric_vars.length >= 1) {
                                for(var in_numvars = 0; in_numvars < numeric_vars.length; in_numvars++) {
                                    if(numeric_vars[in_numvars].varname == line[1]) {
                                        numeric_vars[in_numvars].value = parseFloat(prompt("Give me a number"));
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }

        //debug
        console.log(numeric_vars);

        out = out + "<hr><hr>";

        output.open();
        output.write(out);
        output.close();
    }
}

execute_code();
